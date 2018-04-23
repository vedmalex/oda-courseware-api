import { common } from 'oda-gen-graphql';
import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:register:');
import { mutateAndGetPayload } from 'oda-api-graphql';

export class RegisterUserMutation extends common.types.GQLModule {
  protected _name = "RegisterUserMutation";
  constructor(_args) {
    super(_args);
    this._typeDef = {
      types: [
        ` input registerUserInput {
            clientMutationId: String
            userName: String!
            password: String!
          }

          type registerUserPayload {
            clientMutationId: String
            viewer: Viewer
            token: String
            role: String
            message: String
          }
        `,
      ],
    };

    this._mutationEntry = {
      entry: [
        `registerUser(input: registerUserInput!): registerUserPayload`,
      ],
    };

    this._mutation = {
      registerUser: mutateAndGetPayload(
        async (
          args: {
            userName?: string,
            password?: string,
          },
          context,
          info
        ) => {
          debugger;
          logger.trace('registerUser');
          let message;
          let result: {
            // what must be in output
            token?: any; // string,
            message?: any;
            role?: any;
          } = {};

          let user = await context.systemGQL({
            query: `
            query getUser($userName: String) {
              user(userName: $userName) {
                id
                userName
                password
                enabled
                isAdmin
                isSystem
              }
            }
          `,
            variables: {
              userName: args.userName,
            },
          }).then((r) => {
            if (r.data) {
              return r.data.user;
            }
          }).catch(e => {
            result.message = e.toString();
          });

          if (user) {
            result.message = 'user already exists';
          } else {
            let newUser = await context.systemGQL({
              query: `
              mutation createUser($userName: String!, $password: String!){
                createUser(input:{userName:$userName, password: $password, enabled: true}){
                  user{
                    node{
                      userName
                      enabled
                    }
                  }
                }
              }
          `,
              variables: {
                userName: args.userName,
                password: args.password,
              },
            })
              .then(r => {
                debugger;
                if (r.data && r.data.createUser) {
                  return r.data.createUser.user.node
                }
              })
              .catch(e => { result.message = e.toString(); })

            if (newUser && !newUser.enabled) {
              result.message = 'wait for sysadmin review';
            }

            if (newUser.enabled) {
              let loginUserToken = await context.systemGQL({
                query: `
              mutation loginUser($userName: String!, $password: String!){
                loginUser(input:{userName:$userName, password: $password}){
                  token
                }
              }
          `,
                variables: {
                  userName: args.userName,
                  password: args.password,
                },
              })
                .then(r => {
                  if (r.data && r.data.loginUser) {
                    return r.data.loginUser.token;
                  }
                })
                .catch(e => {
                  message = e.toString();
                });
              if (loginUserToken) {
                result.token = loginUserToken
                result.role = context.userGroup || 'public'
                result.message = 'success';
              } else {
                result.message = message;
              }
            }
          }
          return result;
        }
      ),
    };
  }
}
