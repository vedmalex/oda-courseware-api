import { common } from 'oda-gen-graphql';
import { FixupPasswordHook } from './api-hooks/fixupPassword';
// import { UserTenantProfileTypeExtention } from './entities/UserTenatnProfile';
import { LoginUserMutation } from './mutations/login.resolver';
import { GetProfileQuery } from './queries/getProfileQuery';
import { RegisterUserMutation } from './mutations/registerUserMutation';
import { ACL } from './_acl';

import { LodashModule } from 'oda-lodash';
import { User } from './User';

export class CommonExtends extends common.types.GQLModule {
  protected _name = 'CommonExtends';
  protected _composite = [
    new ACL({}),
    new FixupPasswordHook({}),
    new RegisterUserMutation({}),
    new LoginUserMutation({}),
    new LodashModule({}),
    new GetProfileQuery({}),
    // new User({}),
  ];
}
