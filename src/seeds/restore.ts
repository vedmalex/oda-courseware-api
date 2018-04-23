import { dataPump } from 'oda-api-graphql';
import { join as joinPath } from 'path';

import apollo from './apollo';
import loaderConfig from './loaderConfig';

require('isomorphic-fetch');
const storedQ = require('./../../data/seed-queries.json');

let fn = process.argv[2] ? joinPath(process.cwd(), process.argv[2]) : joinPath(__dirname, '../../data/dump1.json');
let token = process.argv[3] ? process.argv[3] : undefined;

let data = require(fn);
const client = apollo({ uri: loaderConfig.uri, token });

dataPump.restoreData(loaderConfig.import.queries, storedQ, client, data).
  then(() => dataPump.restoreData(loaderConfig.import.relate, storedQ, client, data))
  .catch(e => console.error(e));
