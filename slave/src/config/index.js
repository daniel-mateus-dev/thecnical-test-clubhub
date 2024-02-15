const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../.env"),
});
module.exports = {
  sslLabs: {
    hostname: process.env.URL_API_SSL_VERSION,
  },
  databaseConfig: {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    dialect: process.env.DIALECT_DB,
  },
  kafkaConfig: {
    host: process.env.KAFKA_HOST,
    port: process.env.KAFKA_PORT,
  },
};
