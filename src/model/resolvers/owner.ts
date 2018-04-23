import { SystemGraphQL } from '../runQuery';

export const getOwner = (id: string) => {
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
      if (result.data) {
        return result.data.user;
      }
    }).catch(e => {
      throw e;
    });
};