const express = require("express");
const app = express();

const { serverConfig } = require("./src/config");

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

app.use(cors());
app.use(helmet());
app.use(morgan(serverConfig.env));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./src/routes");
app.use(`/api/${serverConfig.apiVersion}`, routes);

const { sequelize } = require("./src/database");

const initializeServer = async () => {
  console.log(`Initializing server, environment: ${serverConfig.env}.`);

  await sequelize.authenticate().catch((err) => {
    console.error("Unable to connect to the database:", err);
    throw err;
  });

  await sequelize.sync({ force: true }).catch((err) => {
    console.error("Unable to sync the database:", err);
    throw err;
  });

  app.listen(serverConfig.port, () => {
    console.log(`Server running on port ${serverConfig.port}.`);
    console.log(`Server ready`);
  });
};

initializeServer().catch((error) => {
  console.error(`Server stop, error: ${error}`);
});
