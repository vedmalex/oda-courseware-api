import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import { SystemGraphQL } from './model/runQuery';

(async () => {
  let connectors = await SystemGraphQL.connectors();
  await connectors.syncDb(true);
  await connectors.close();
})();