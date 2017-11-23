import * as config from 'config';
import * as Sequelize from 'sequelize';

import { DbMongooseConnectionPool, DbSequelizeConnectionPool } from 'oda-api-common';
export const dbPool = new DbMongooseConnectionPool({ defaultUrl: config.get<string>('db.api.url') });
export const dbSqlPool = new DbSequelizeConnectionPool({ defaultUrl: config.get<string>('db.api2.url') });
