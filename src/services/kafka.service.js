const { Kafka } = require("kafkajs");
const { kafkaConfig } = require("../config");

const kafka = new Kafka({
  clientId: "main-code",
  brokers: [`${kafkaConfig.host}:${kafkaConfig.port}`],
});

const producer = kafka.producer();

const sendMessage = async (topic, payload) => {
  await producer.connect();
  const message = JSON.stringify(payload);
  console.log(message);
  await producer.send({
    topic,
    messages: [
      {
        value: message,
      },
    ],
  });
};

module.exports = { sendMessage };
