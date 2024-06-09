/* eslint-disable no-unused-vars */
const bCrypt = require("bcryptjs");
const constant = require("../../app/utils/constant.utils");
const config = require("../../app/configs/general.config");
const table = { schema: "game_server", tableName: "tbl_player_inventory" };

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(table, [
      {
        playerId: 2,
        itemId: 1,
        quantity: 5,
        sellPrice: 100,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 3,
        itemId: 2,
        quantity: 3,
        sellPrice: 50,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 2,
        itemId: 3,
        quantity: 2,
        sellPrice: 200,
        createdBy: 3,
        updatedBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 3,
        itemId: 4,
        quantity: 1,
        sellPrice: 150,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 4,
        itemId: 5,
        quantity: 4,
        sellPrice: 300,
        createdBy: 3,
        updatedBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 2,
        itemId: 6,
        quantity: 7,
        sellPrice: 80,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 3,
        itemId: 7,
        quantity: 6,
        sellPrice: 120,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 4,
        itemId: 8,
        quantity: 3,
        sellPrice: 250,
        createdBy: 3,
        updatedBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 2,
        itemId: 9,
        quantity: 8,
        sellPrice: 180,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        playerId: 3,
        itemId: 10,
        quantity: 2,
        sellPrice: 220,
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
