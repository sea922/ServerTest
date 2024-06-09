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
        as: "player",
        foreignKey: "playerId",
      });
      models.TransactionHistory.belongsTo(models.Item, {
        as: "item",
        foreignKey: "itemId",
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
      playerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      itemId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      quantityChange: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      previousQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currentQuantity: {
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
