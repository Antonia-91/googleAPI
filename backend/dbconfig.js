const dotenv = require('dotenv');
dotenv.config();

const sqlConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "nmseo-tools",
    server: 'nmseodb01.database.windows.net',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

  module.exports = sqlConfig;