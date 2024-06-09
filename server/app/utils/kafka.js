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


async function produceMessage(topic, message) {
  await producer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(message) }],
  });
}

async function consumeMessages() {
  await consumer.subscribe({ topic: 'inventory_updates' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const inventoryUpdate = JSON.parse(message.value.toString());
      console.log('Received inventory update:', inventoryUpdate);
      // Process inventory update
    },
  });
}


module.exports = {
  produceMessage,
  consumeMessages
};