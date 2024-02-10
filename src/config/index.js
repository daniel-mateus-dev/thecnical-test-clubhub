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
};
