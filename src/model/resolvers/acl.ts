// эта штука должна определять название security группы, чтобы можно было использовать в дальнейшем
// при определении названия security группы
import { SystemGraphQL } from '../runQuery';

export const getAcl = (id: string) => {
  return SystemGraphQL.query({
    query: `
      query getUser($userId: ID) {
        user(id: $userId) {
          id
          userName
          enabled
          isAdmin
          isSystem
        }
      }
    `,
    variables: {
      userId: id,
    },
  }).then(
    (result) => {
      if (result.data && result.data.user) {
        let user = result.data.user;
        if (user.isSystem) {
          return 'system';
        } else {
          return 'owner';
        }
      } else {
        return 'public';
      }
    }).catch(e => {
      throw e;
    });
};