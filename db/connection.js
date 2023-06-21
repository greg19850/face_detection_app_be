const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set');
}

const config =
  ENV === 'production'
    ? {
      connectionString: process.env.DATABASE_URL,
      max: 2,
      // user: process.env.DB_USER,
      // password: process.env.PASSWORD,
      // database: process.env.DB_NAME
    }
    : {};

module.exports = new Pool(config);
