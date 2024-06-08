// third party components
const Sequelize = require("sequelize");

// our components
const constant = require("../../utils/constant.utils");

module.exports = (database, DataTypes) => {
  class TransactionHistory extends Sequelize.Model {
    // You can define associations with other models here
    static associate(models) {
      // Define associations if needed
      models.TransactionHistory.belongsTo(models.Player, {
        as: "traders",
        foreignKey: "player_id",
      });
      models.TransactionHistory.belongsTo(models.Item, {
        as: "sell_item",
        foreignKey: "item_id",
      });
    }
  }

  TransactionHistory.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      player_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      change: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      previous_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      current_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE, // or Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize: database,
      tableName: "tbl_transaction_history",
      timestamps: false,
    }
  );

  return TransactionHistory;
};
