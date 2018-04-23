import { ExtendedSystemPackage as SystemPackage } from './packages/system';
import { ExtendedPublicPackage as PublicPackage } from './packages/public';
import { ExtendedUsersPackage as OwnerPackage } from './packages/owner';
import { SystemGraphQL } from './runQuery';

export const packages = {
  system: SystemPackage,
  public: PublicPackage,
  owner: OwnerPackage,
};

export { SystemGraphQL };

export { getUser as resolveUser } from './resolvers/user';
export { getOwner as resolveOwner } from './resolvers/owner';
export { getAcl as resolveAcl } from './resolvers/acl';
