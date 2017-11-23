import { common } from 'oda-gen-graphql';
import { StudentEntity } from './Student';

export class Overrides extends common.types.GQLModule {
  protected _extend = [
    // new StudentEntity({}),
  ];
}
