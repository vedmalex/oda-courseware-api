// this package is for DataPump ONLY!!!!
// is wrapped from SYSTEM PACKAGE

// tslint:disable:no-unused-variable
import { common } from 'oda-gen-graphql';
import { SystemPackage } from './../../graphql-gen/system';
const { deepMerge } = common.lib;

import { CommonExtends } from '../common';

export class SystemDataPumpSchema extends common.types.GQLModule {
  protected _name = 'SystemDataPump';
  protected _composite = [
    new SystemPackage({}),
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

      schema {
        query: RootQuery
        mutation: RootMutation
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
      },
    );
  }

  public get resolvers() {
    return this.resolver;
  }
}



