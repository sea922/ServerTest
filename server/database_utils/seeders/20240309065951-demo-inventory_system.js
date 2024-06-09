/* eslint-disable no-unused-vars */
const bCrypt = require("bcryptjs");
const constant = require("../../app/utils/constant.utils");
const config = require("../../app/configs/general.config");
const table = { schema: "game_server", tableName: "tbl_system_inventory" };

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(table, [
      {
        itemId: 1,
        buyPrice: 100,
        sellPrice: 4,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 2,
        sellPrice: 4,
        buyPrice: 50,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 3,
        buyPrice: 200,
        sellPrice: 4,
        createdBy: 3,
        updatedBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 4,
        buyPrice: 150,
        sellPrice: 4,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 5,
        buyPrice: 300,
        sellPrice: 4,
        createdBy: 3,
        updatedBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 6,
        buyPrice: 80,
        sellPrice: 4,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 7,
        buyPrice: 120,
        sellPrice: 4,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 8,
        buyPrice: 250,
        sellPrice: 4,
        createdBy: 3,
        updatedBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 9,
        buyPrice: 180,
        sellPrice: 4,
        createdBy: 2,
        updatedBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 10,
        buyPrice: 220,
        sellPrice: 4,
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
