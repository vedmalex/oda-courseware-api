import * as config from 'config';
import { DbMongooseConnectionPool } from 'oda-api-graphql-mongoose';
export const dbPool = new DbMongooseConnectionPool({ defaultUrl: config.get<string>('db.api.url') });