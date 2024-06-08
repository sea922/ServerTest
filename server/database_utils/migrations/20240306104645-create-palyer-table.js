/* eslint-disable no-unused-vars */
const constant = require('../../app/utils/constant.utils');
const config = require('../../app/configs/general.config');
const table = {schema: "game_server", tableName: 'tbl_player'};

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(table, {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(64),
        allowNull: false,
      },
      displayName: {
        type: Sequelize.DataTypes.STRING(64),
        allowNull: false,
      },
      type: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: constant.USER_TYPE_ENUM.END_USER,
        comment: JSON.stringify(constant.USER_TYPE_ENUM),
      },
      coin: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      activated: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: constant.BOOLEAN_ENUM.FALSE,
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
