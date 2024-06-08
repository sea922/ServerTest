/* eslint-disable no-unused-vars */
const constant = require('../../app/utils/constant.utils');
const config = require('../../app/configs/general.config');
const table = {schema: "game_server", tableName: 'tbl_transactions_history'};

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(table, {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      player_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      item_id: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      change: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      previous_quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      current_quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
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
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable(table);
  },
};
