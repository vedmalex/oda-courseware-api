import { mutateAndGetPayload } from 'oda-api-graphql';
import { passport } from 'oda-api-common';
import { common } from 'oda-gen-graphql';

export class GetProfileQuery extends common.types.GQLModule {
  protected _name = 'GetProfileQuery';
  protected _queryEntry = {
    entry: [`
      getProfile: String
    `]
  }
  protected _query = {
    getProfile: (
      owner,
      args,
      context,
      info
    ) => context.userGroup || 'public',
  };
}
