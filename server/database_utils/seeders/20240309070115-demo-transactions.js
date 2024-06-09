/* eslint-disable no-unused-vars */
const constant = require("../../app/utils/constant.utils");
const config = require("../../app/configs/general.config");
const table = { schema: "game_server", tableName: "tbl_transactions_history" };

module.exports = {
  async up(queryInterface, Sequelize) {
    const transactions = [
      {
        playerId: 1,
        itemId: 1,
        quantityChange: 5,
        previousQuantity: 0,
        currentQuantity: 5,
        type: "buy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 2,
        itemId: 2,
        quantityChange: 3,
        previousQuantity: 0,
        currentQuantity: 3,
        type: "buy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 3,
        itemId: 1,
        quantityChange: 2,
        previousQuantity: 0,
        currentQuantity: 2,
        type: "sell",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert(table, transactions);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(table, null, {});
  },
};
