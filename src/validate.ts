// tslint:disable:no-unused-variable
import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import * as  path from 'path';
import { validate } from 'oda-gen-graphql';
// import * as schema from './../compiledModel.json';
import schema from './schema';
// import * as modelHooks from './model/hooks';

validate({
  pack: schema,
  rootDir: path.join(__dirname, '../src', 'graphql-gen'),
  config: {
    graphql: true,
    ts: true,
    ui: false,
    packages: true, ///['system'],
  },
  // context: {
  //   typeMapper: {
  //     enums: {
  //       ItemStatus: ['ItemStatus'],
  //       ItemViewStatus: ['ItemViewStatus'],
  //       ItemOptionViewStatus: ['ItemOptionViewStatus'],
  //       ProjectType: ['ProjectType'],
  //     },
  //   }
  // },
  logs: ['error'/* , 'fixable', 'warning', 'critics' */]
  // acl: {
  //   system: 1000,
  //   all: 100,
  // }
});
