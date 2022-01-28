import { Pool } from 'pg';

import knex from 'knex';

import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  database: process.env.FMS_DB,
  user: process.env.FMS_DB_USERNAME,
  password: process.env.FMS_DB_PASSWORD,
  // host: 'host.docker.internal',
  host: 'localhost',
  // port: 5432,
  port: 5438,
});

const pg = knex({
  client: 'pg',
  connection: {
    database: process.env.FMS_DB,
    user: process.env.FMS_DB_USERNAME,
    password: process.env.FMS_DB_PASSWORD,
    host: 'localhost',
    port: 5438,
  }
});

export { pool, pg };
