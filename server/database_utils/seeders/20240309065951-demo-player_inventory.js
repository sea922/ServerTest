/* eslint-disable no-unused-vars */
const bCrypt = require("bcryptjs");
const constant = require("../../app/utils/constant.utils");
const config = require("../../app/configs/general.config");
const table = { schema: "game_server", tableName: "tbl_player_inventory" };

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(table, [
      {
        player_id: 2,
        item_id: 1,
        quantity: 5,
        price: 100,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 3,
        item_id: 2,
        quantity: 3,
        price: 50,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 2,
        item_id: 3,
        quantity: 2,
        price: 200,
        createdBy: 3,
        updatedBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 3,
        item_id: 4,
        quantity: 1,
        price: 150,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 4,
        item_id: 5,
        quantity: 4,
        price: 300,
        createdBy: 3,
        updatedBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 2,
        item_id: 6,
        quantity: 7,
        price: 80,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 3,
        item_id: 7,
        quantity: 6,
        price: 120,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 4,
        item_id: 8,
        quantity: 3,
        price: 250,
        createdBy: 3,
        updatedBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 2,
        item_id: 9,
        quantity: 8,
        price: 180,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        player_id: 3,
        item_id: 10,
        quantity: 2,
        price: 220,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(table);
  },
};
