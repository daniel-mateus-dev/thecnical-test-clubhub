const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../.env"),
});
module.exports = {
  serverConfig: {
    port: process.env.PORT,
    env: process.env.ENV,
    apiVersion: process.env.API_VERSION,
  },
  sslLabs: {
    hostname: process.env.URL_API_SSL_VERSION,
  },
  databaseConfig: {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.DIALECT_DB,
  }
};
