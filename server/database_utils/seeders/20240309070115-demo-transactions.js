/* eslint-disable no-unused-vars */
const constant = require("../../app/utils/constant.utils");
const config = require("../../app/configs/general.config");
const table = { schema: "game_server", tableName: "tbl_transactions_history" };

module.exports = {
  async up(queryInterface, Sequelize) {
    const transactions = [
      {
        player_id: 1,
        item_id: 1,
        change: 5,
        previous_quantity: 0,
        current_quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 2,
        item_id: 2,
        change: 3,
        previous_quantity: 0,
        current_quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 3,
        item_id: 1,
        change: 2,
        previous_quantity: 0,
        current_quantity: 2,
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

