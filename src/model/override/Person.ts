import { common } from 'oda-gen-graphql';

import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

let logger = log4js.getLogger('graphql:query:Student');

import RegisterConnectors from '../connectors';

export class PersonEntity extends common.types.GQLModule {
  protected _name = 'PersonEntity';
  protected _resolver = {
    Person: {
      ages: async (
        { _id: id,
          dateOfBirth,
        }, // owner id
        args,
        context: { connectors: RegisterConnectors },
        info) => {
        let dob = dateOfBirth ? new Date(dateOfBirth) : undefined;
        if (dob) {
          let now = new Date();
          let years = now.getFullYear() - dob.getFullYear();
          let months = now.getMonth() - dob.getMonth();
          let days = now.getDate() - dob.getDate();

          if (years >= 0 && (months < 0 || (months <= 0 && days < 0))) {
            years -= 1;
          }
          return years;
        }
      },
    },
  };
}
