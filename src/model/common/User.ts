import { common } from 'oda-gen-graphql';

export class User extends common.types.GQLModule {
  protected _name = 'User';
  protected _queryEntry = {
    'queryEntry': [`
      users: UsersConnection
      user(id: ID, userName: String): User
`],
  };
  protected _resolver = {
    User: {
      id: () => 'false',
      isAdmin: () => true,
    },
  }
}