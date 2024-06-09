// third party components
const Sequelize = require("sequelize");

// our components
const constant = require("../../utils/constant.utils");

module.exports = (database, DataTypes) => {
  class SystemInventory extends Sequelize.Model {
    // initiate associate with other models (automatically called in ../models/index.js)
    static associate(models) {
      models.SystemInventory.belongsTo(models.Item, {
        as: "item",
        foreignKey: "itemId",
      });
    }
  }

  SystemInventory.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      itemId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      buyPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sellPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.DATE, // or Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize: database,
      tableName: "tbl_system_inventory",
    }
  );

  return SystemInventory;
};
