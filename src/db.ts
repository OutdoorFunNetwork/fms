import { Pool } from "pg";
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    database: process.env.FMS_DB,
    user: process.env.FMS_DB_USERNAME,
    password: process.env.FMS_DB_PASSWORD,
    host: 'localhost',
    port: 5438
});

console.log(process.env);

export default pool;