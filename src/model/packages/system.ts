// tslint:disable:no-unused-variable
import { common } from 'oda-gen-graphql';
import { SystemPackage as Extendee } from './../../graphql-gen/system';
const { deepMerge } = common.lib;

import { CommonExtends } from '../common';
import { Overrides } from '../override';

import { pubsub } from '../pubsub';
import { withFilter } from 'graphql-subscriptions';

export class ExtendedSystemPackage extends common.types.GQLModule {
  protected _name = 'ExtendedSystemPackage';
  protected _composite: common.types.GQLModule[] = [
    new Extendee({}),
    new CommonExtends({}),
    new Overrides({}),
  ];
}

export class SystemSchema extends common.types.GQLModule {
  protected _name = 'ExtendedSystemPackage';
  protected _composite = [
    new ExtendedSystemPackage({}),
  ];

  public get typeDefs() {
    return `
      ${this.typeDef.join('\n  ')}

      type Viewer implements Node {
        id: ID!
        ${this.viewerEntry.join('\n  ')}
      }

      type RootQuery {
        ${this.queryEntry.join('\n  ')}
      }

      type RootMutation {
        ${this.mutationEntry.join('\n  ')}
      }

      type RootSubscription {
        ${this.subscriptionEntry.join('\n  ')}
      }

      schema {
        query: RootQuery
        mutation: RootMutation
        subscription: RootSubscription
      }
      `;
  }

  public build() {
    super.build();
    this._resolver = deepMerge(
      this.resolver,
      this.viewer,
      {
        RootQuery: this.query,
        RootMutation: this.mutation,
        RootSubscription: deepMerge(this.subscription, {
          // login: {
          //   subscribe: () => pubsub.asyncIterator('login'),
          // },
        }),
      },
    );
  }

  public get resolvers() {
    return this.applyHooks(this.resolver);
  }
}



