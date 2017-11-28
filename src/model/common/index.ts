import { common } from 'oda-gen-graphql';
import { FixupPasswordHook } from './api-hooks/fixupPassword';
// import { UserTenantProfileTypeExtention } from './entities/UserTenatnProfile';
import { LoginUserMutation } from './mutations/login.resolver';
import { LodashModule } from 'oda-lodash';

export class CommonExtends extends common.types.GQLModule {
  protected _name = 'CommonExtends';
  protected _extend = [
    new FixupPasswordHook({}),
    new LoginUserMutation({}),
    new LodashModule({}),
  ];
}
