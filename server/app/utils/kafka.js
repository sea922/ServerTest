const { Kafka } = require("kafkajs");


const { redisClient } = require("./redis");
const Logger = require("./logger.utils");
const { TransactionHistory } = require("../databases/postgreSQL/index");


// Kafka connection
const kafka = new Kafka({
  clientId: "game-service",
  brokers: [`${process.env.BROKER_HOST}`],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "inventory-group" });

(async () => {
  await producer.connect();
  Logger.info("Connected to Kafka producer successfully.");
  await consumer.connect();
  Logger.info("Connected to Kafka consumer successfully.");
})();


async function produceMessage(topic, message) {
  try {
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error producing message:", error);
    // Check if the error is
    }
  }


const processTransactions = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'inventory_updates', fromBeginning: true });

  await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
          try {
              const transactionData = JSON.parse(message.value.toString());
              // Process the transaction data and record inventory balance update history
              const transactionKey = `transaction:${transactionData.timestamp}:${transactionData.updatedBy}`;
              const transactionBody = {
                  type: transactionData.type,
                  playerId: transactionData.playerId,
                  itemId: transactionData.itemId,
                  quantityChange: transactionData.quantityChange,
                  previousQuantity: transactionData.previousQuantity,
                  currentQuantity: transactionData.currentQuantity,
                  createdAt: transactionData.timestamp,
              };

              await TransactionHistory.create(
                transactionBody,
              );
              // await redisClient.set(transactionKey, JSON.stringify(transactionHistory));
          } catch (error) {
              Logger.error('Error processing transaction:'+ error);
          }
      },
  });
};


module.exports = {
  produceMessage,
  processTransactions
};