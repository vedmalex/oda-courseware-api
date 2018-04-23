import { common } from 'oda-gen-graphql';
import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:query:');
import { acl } from 'oda-api-graphql';
import { runtimeMutationAcl } from '../hooks';

const securedMutations = new acl.secureMutations.SecureMutation({ acls: runtimeMutationAcl });

export class ACL extends common.types.GQLModule {
  private allow;
  protected _name = 'ACL';
  constructor(_args) {
    super(_args);
    this._queryEntry = {
      queryEntry: [
        `_acl(mutation: [String!]): JSON`,
      ],
    };
    this._viewerEntry = {
      viewerEntry: [
        `_acl(mutation: [String!]): JSON`,
      ],
    };
    this.allow = securedMutations.allow.bind(securedMutations);
    this._query = {
      _acl: this.run.bind(this),
    };
    this._viewer = {
      Viewer: {
        _acl: this.run.bind(this),
      },
    };
  }
  private check(mutations, group) {
    return mutations.map(m => ({ key: m, value: !!this.allow(group, m) })).reduce((result, curr) => {
      if (!curr.value) {
        result[curr.key] = curr.value;
      }
      return result;
    }, { '*': true });
  }
  private async run(
    owner,
    args: {
      mutation: string[],
    },
    context,
    info,
  ) {
    debugger;
    logger.trace('_acl');
    const group = context.userGroup;
    if (args.mutation && args.mutation.length > 0) {
      return this.check(args.mutation, group);
    } else {
      return this.check(Object.keys(info.schema.getMutationType().getFields()), group);
    }
  };
}
