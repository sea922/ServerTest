/* eslint-disable no-unused-vars */
const constant = require("../../app/utils/constant.utils");
const config = require("../../app/configs/general.config");
const table = { schema: "game_server", tableName: "tbl_item" };

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(table, {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.DataTypes.STRING(64),
        allowNull: false,
      },
      metadata: {
        type: Sequelize.DataTypes.JSON,
        allowNull: true,
      },
      buyPrice: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      sellPrice: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      deleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: constant.BOOLEAN_ENUM.FALSE,
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
