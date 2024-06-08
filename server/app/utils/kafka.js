const { Kafka } = require("kafkajs");

// Kafka connection
const kafka = new Kafka({
  clientId: "game-service",
  brokers: [`${process.env.BROKER_HOST}`],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "game-group" });

(async () => {
  await producer.connect();
  Logger.info("Connected to Kafka producer successfully.");
  await consumer.connect();
  Logger.info("Connected to Kafka consumer successfully.");
})();


const produce = (topic, message) => {
  producer.send([{ topic, messages: JSON.stringify(message) }], (err, data) => {
    if (err) console.error('Kafka send error:', err);
  });
};


module.exports = {
  produce
};