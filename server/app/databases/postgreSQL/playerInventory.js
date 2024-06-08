// third party components
const Sequelize = require("sequelize");

// our components
const constant = require("../../utils/constant.utils");

module.exports = (database, DataTypes) => {
  class PlayerInventory extends Sequelize.Model {
    // initiate associate with other models (automatically called in ../models/index.js)
    static associate(models) {
      // models.Item.hasMany(models.TransactionHistory, {
      //   as: "listItem",
      //   foreignKey: "item_id",
      // });
    }
  }

  PlayerInventory.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      player_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize: database,
      tableName: "tbl_player_inventory",
    }
  );

  return PlayerInventory;
};
