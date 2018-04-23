import { common } from 'oda-gen-graphql';

import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

let logger = log4js.getLogger('graphql:query:Student');

import RegisterConnectors from '../connectors';

export class CuratorEntity extends common.types.GQLModule {
  protected _name = 'CuratorEntity';
  protected _resolver = {
    Curator: {
      spiritualName: async (
        {
          _id: id,
          person: personId,
        }, // owner id
        args,
        context: { connectors: RegisterConnectors },
        info) => {
        let result;
        let person = await context.connectors.Person.findOneById(personId);
        if (person) {
          result = person.spiritualName;
          return result;
        }
      },
      fullName: async (
        {
          _id: id,
          person: personId,
        }, // owner id
        args,
        context: { connectors: RegisterConnectors },
        info) => {
        let result;
        let person = await context.connectors.Person.findOneById(personId);
        if (person) {
          result = person.fullName;
          return result;
        }
      },
    },
  };
}
