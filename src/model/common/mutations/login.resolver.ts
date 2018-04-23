import { mutateAndGetPayload } from 'oda-api-graphql';
import { passport } from 'oda-api-common';
import { common } from 'oda-gen-graphql';
import { getAcl } from './../../resolvers/acl';

export class LoginUserMutation extends common.types.GQLModule {
  protected _name = 'LoginUserMutation';
  protected _mutation = {
    loginUser: mutateAndGetPayload(
      async (
        args: {
          userName?: string,
          password?: string,
        },
        context,
        info
      ) => {
        let result: {
          token?: string;
          role: string;
        };

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
          throw e;
        });

        if (!user || (user && !user.enabled)) {
          throw new Error('Login Error');
        }

        // password didn't stored in open way
        let { salt, hash } = JSON.parse(user.password);
        result = {
          token: await passport.loginBearer(user.id, args.password, salt, hash),
          role: await getAcl(user.id) || 'public',
        };

        return result;
      },
    ),
  };
}
