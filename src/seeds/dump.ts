import { writeFileSync } from 'fs-extra';
import { dataPump } from 'oda-api-graphql';
import { join as joinPath } from 'path';
import apollo from './apollo';
import loaderConfig from './loaderConfig';

require('isomorphic-fetch');
const storedQ = require('./../../data/seed-queries.json');

let fn = process.argv[2] ? joinPath(process.cwd(), process.argv[2]) : joinPath(__dirname, '../../data/dump1.json');
let token = process.argv[3] ? process.argv[3] : undefined;
const client = apollo({ uri: loaderConfig.uri, token });

dataPump.dumpData(loaderConfig, storedQ, client).
  then((result) => {
    writeFileSync(fn, JSON.stringify(result));
  })
  .catch(e => console.error(e));
