/* eslint-disable no-unused-vars */
const constant = require('../../app/utils/constant.utils');
const config = require('../../app/configs/general.config');
const table = {schema: "game_server", tableName: 'tbl_system_inventory'};

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(table, {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      itemId: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      buyPrice: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      sellPrice: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      updatedBy: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      deletedBy: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable(table);
  },
};
