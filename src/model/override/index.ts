import { common } from 'oda-gen-graphql';
import { PersonEntity } from './Person';

export class Overrides extends common.types.GQLModule {
  protected _extend = [
    new PersonEntity({}),
  ];
}
