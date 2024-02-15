const { Kafka } = require("kafkajs");
const { kafkaConfig } = require("./src/config");
const { sequelize } = require("./src/database");
const { saveDataHotelController } = require("./src/controller/save.controller");

const kafka = new Kafka({
  clientId: "slave",
  brokers: [`${kafkaConfig.host}:${kafkaConfig.port}`],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const subscribe = async () => {
  console.log("Server subscription...");
  await consumer.connect();
  console.log("Consumer connected");
  await consumer.subscribe({
    topic: "start-save-data",
    fromBeginning: true,
  });
  console.log("Consumer subscribed successfully");
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const json = JSON.parse(message.value.toString());
      let url = json.url;
      url = url.replace("https://", "");
      url = url.replace("http://", "");
      const hotel = json.hotelId;
      await saveDataHotelController(url, hotel);
    },
  });
};

const initDatabase = async () => {
  await sequelize.authenticate().catch((err) => {
    console.error("Unable to connect to the database:", err);
    throw err;
  });

  await sequelize.sync({ force: false }).catch((err) => {
    console.error("Unable to sync the database:", err);
    throw err;
  });
};

const initServer = async () => {
  console.log("Connecting to database...");
  await initDatabase();
  console.log("Connected to database successfully");

  console.log("Connecting to kafka...");
  await subscribe();
  console.log("Connected to kafka successfully");
};

initServer().catch((err) => {
  console.error(`Error initialized server`);
  console.error(err);
});
