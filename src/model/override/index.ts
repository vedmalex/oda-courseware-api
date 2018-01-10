import { common } from 'oda-gen-graphql';
import { PersonEntity } from './Person';
import { CuratorEntity } from './Curator';

export class Overrides extends common.types.GQLModule {
  protected _name = 'Overrides';
  protected _extend = [
    new PersonEntity({}),
    new CuratorEntity({}),
  ];
}
