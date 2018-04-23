import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
// tslint:disable-next-line:no-unused-variable
import * as config from 'config';
import { runQuery } from 'graphql-server-core';
import * as cors from 'cors';
// tslint:disable-next-line:no-var-requires
let currentModule = require('../package.json');

import RegisterConnectors from './model/connectors';

import { SystemGraphQL, UserGQL } from './model/runQuery';

import { GraphQLSchema, execute, subscribe } from 'graphql';

import { register } from './register';
import * as path from 'path';

import { Server, middleware, passport } from 'oda-api-common';

import * as bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { graphqlLodashExpress } from 'oda-lodash';
import { makeExecutableSchema, addSchemaLevelResolveFunction } from 'graphql-tools';
import * as packages from './model/schema';
import * as compression from 'compression';
import { Factory } from 'fte.js';
import { acl } from 'oda-api-graphql';
// to be changed after upgrade
import { runtimeMutationAcl as acls } from './model/hooks';
import * as passportLib from 'passport';
import { resolveOwner, resolveUser, resolveAcl } from './model';

import * as fs from 'fs-extra';

// subscriptions
import { pubsub } from './model/pubsub';
import { dbPool } from './model/dbPool';
import { createServer } from 'http';
import { SubscriptionServer, ExecuteFunction, SubscribeFunction } from 'subscriptions-transport-ws';
import { apolloUploadExpress } from 'apollo-upload-server';

import {
  toGlobalId,
  fromGlobalId,
} from 'oda-api-graphql';

const WS_PORT = config.get<number>('subscriptions.port');
const WS_HOST = config.get<number>('subscriptions.host');

// для count можно использовать наборы фильтров, благо механизм работает отлично!
// и возвращать функцию или фильтр который можно использовать для дофильтровки данных.. чтобы получить число...

const OwnerUserRead = (context, { source }) => {
  debugger;
  if (source && toGlobalId('User', source.id) === context.user.id) {
    return source;
  }
};

const OwnerUserRemove = (context, { source }) => {
  debugger;
  if (source && toGlobalId('User', source.id) === context.user.id) {
    return source;
  }
};

const Owner_ToDoItem_read = (context, { source }) => {
  debugger;
  if (source && (source.user === context.user.userName || source.published)) {
    return source;
  }
}

const Owner_ToDoItem_update = (context, { source, payload }) => {
  debugger;
  if (source && (source.user === context.user.userName)) {
    if (payload && payload.hasOwnProperty('user')) {
      delete payload.user;
    }
    if (Object.keys(payload).length > 0) {
      payload.updatedAt = new Date();
      payload.updatedBy = fromGlobalId(context.user.id).id;
    }
    return source;
  }
}

const Owner_ToDoItem_create = (context, { payload }) => {
  payload.user = context.user.userName;
  payload.createdAt = new Date();
  payload.createdBy = fromGlobalId(context.user.id).id;
  return payload;
}

const PUBLIC_TODOITEM = (context, { source }) => {
  debugger;
  if (source && source.published) {
    return source;
  }
}

async function createContext({ user, owner, userGroup, schema }: { user, owner, userGroup: string, schema?}) {
  let db = await dbPool.get(userGroup);
  let connectors = new RegisterConnectors({
    mongoose: db,
    acls: {
      read: {
        owner: {
          'User': OwnerUserRead,
          'ToDoItem': Owner_ToDoItem_read,
        },
        "public": {
          ToDoItem: PUBLIC_TODOITEM
        }
      },
      update: {
        owner: {
          "ToDoItem": Owner_ToDoItem_update
        }
      },
      create: {
        owner: {
          "ToDoItem": Owner_ToDoItem_create
        }
      },
      remove: {
        owner: {
          User: OwnerUserRead,
          "ToDoItem": Owner_ToDoItem_update
        }
      }
    },
    user: user,
    owner: owner,
    userGroup,
  });

  const result = {
    connectors,
    systemConnectors: await SystemGraphQL.connectors(),
    systemGQL: SystemGraphQL.query,
    userGQL: undefined,
    db,
    dbPool,
    pubsub,
    user,
    owner,
    userGroup,
    schema,
  };

  const userGQL = new UserGQL({
    context: result,
    schema,
  });

  result.userGQL = userGQL.query.bind(userGQL);

  return result;
}

function prepareSchema(securedMutations: acl.secureMutations.SecureMutation) {
  const schemas = {} as {
    public: GraphQLSchema,
    owner: GraphQLSchema,
    system: GraphQLSchema,
  };

  for (let pack in packages) {
    if (packages.hasOwnProperty(pack)) {
      let current = new packages[pack]({});
      current.build();
      // fs.writeFileSync(`${pack}.graphql`, current.typeDefs.toString());
      schemas[pack] = makeExecutableSchema({
        typeDefs: current.typeDefs.toString(),
        resolvers: current.resolvers,
        resolverValidationOptions: {
          requireResolversForNonScalar: false,
        },
      });
      if (['owner', 'public'].indexOf(pack) > -1) {
        addSchemaLevelResolveFunction(schemas[pack], securedMutations.secureMutation.bind(securedMutations)());
      }
    }
  }
  return schemas;
}

export class SampleApiServer extends Server {
  public config() {
    super.config();

    // to changed after upgrade
    const securedMutations = new acl.secureMutations.SecureMutation({
      acls,
      userGroup: (context) => {
        let result = 'public';
        if (context.user) {
          if (context.user.isSystem) {
            result = 'system';
          } else if (!context.user.isAnonymous) {
            result = 'owner';
          }
        }
        return result;
      },
    });

    const schemas = prepareSchema(securedMutations);

    this.initLogger();

    // Проверить как работает...
    this.app.set('views', path.join(__dirname, '..', 'views'));

    passport.init(this.app, passportLib, resolveUser);
    let index = new Factory({
      root: path.join(__dirname, '..', '..', 'views'),
      watch: true,
      preload: true,
      ext: 'nhtml',
    });

    this.app.set('view engine', 'nhtml');
    this.app.engine('nhtml', index.express());

    this.app.use(compression());

    const websocketServer = createServer((request, response) => {
      response.writeHead(404);
      response.end();
    });

    // Bind it to port and start listening
    websocketServer.listen(WS_PORT, () => console.log(
      `Websocket Server is now running on http://${WS_HOST}:${WS_PORT}`,
    ));

    const toExecute = (schema, document, rootValue, contextValue, variableValues, operationName) => {
      return execute(contextValue.schema, document, rootValue, contextValue, variableValues, operationName)
    }

    const toSubscribe = (schema, document, rootValue, contextValue, variableValues, operationName) => {
      return subscribe(contextValue.schema, document, rootValue, contextValue, variableValues, operationName)
    }

    const subscriptionsServer = new SubscriptionServer({
      execute: toExecute,
      subscribe: toSubscribe,
      schema: {} as any,
      onConnect: async (connectionParams, webSocket, connectionContext) => {
        let user: any = await passport.verifyToken(resolveUser, connectionParams.authToken);

        if (!user || (user && !user.enabled)) {
          throw new Error('unauthorized access is prohibited');
        }
        let userGroup = await resolveAcl(user.id) || 'public';
        return await createContext({
          user,
          owner: await resolveOwner(user.id),
          schema: schemas[userGroup],
          userGroup,
        });
      },
    },
      {
        server: websocketServer,
      },
    );

    // owner detection middleware
    this.app.use(middleware.aclGroupDiscovery(resolveAcl));
    this.app.use(middleware.ownerDiscovery(resolveOwner));

    const buildSchema = graphqlLodashExpress(async (req, res) => {
      let userGroup = req['aclGroup'] || 'public';
      let db = await dbPool.get(userGroup);

      return {
        schema: schemas[userGroup],
        context: await createContext({
          user: req.user,
          owner: req['owner'],
          userGroup: userGroup,
          schema: schemas[userGroup],
        }),
      };
    });

    this.app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://${WS_HOST}:${WS_PORT}/subscriptions`,
    }));

    this.app.use('/graphql', cors(), bodyParser.json(), buildSchema);

    this.errorHandling();

    this.initStatics();
  }
}

