// third party components
const Sequelize = require('sequelize');

// our components
const constant = require('../../utils/constant.utils');

module.exports = (database, DataTypes) => {
  class Item extends Sequelize.Model {
    // initiate associate with other models (automatically called in ../models/index.js)
    static associate(models) {
      models.Item.hasMany(models.TransactionHistory, {
        as: "transactions",
        foreignKey: "itemId",
      });
      models.Item.hasMany(models.PlayerInventory, {
        as: "list_player_items",
        foreignKey: "itemId",
      });
      // models.Item.hasMany(models.SystemInventory, {
      //   as: "list_system_items",
      //   foreignKey: "itemId",
      // });
    }
  }

  Item.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(128),
          allowNull: true,
          validate: {
            len: {
              args: [2, 128],
              msg: "name must between 2 and 128 characters",
            },
          },
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        metadata: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        type: {
          type: DataTypes.STRING(64),
          allowNull: true,
        },
        buyPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        sellPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: constant.BOOLEAN_ENUM.FALSE,
        },
        createdBy: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        updatedBy: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        deletedBy: {
          type: DataTypes.BIGINT,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize: database,
        tableName: 'tbl_item',
      },
  );

  return Item;
};
