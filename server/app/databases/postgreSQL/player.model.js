// third party components
const Sequelize = require("sequelize");
const validator = require("validator");
const bCrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");

// our components
const config = require("../../configs/general.config");
const constant = require("../../utils/constant.utils");
const pieces = require("../../utils/pieces.utils");

module.exports = (database, DataTypes) => {
  class Player extends Sequelize.Model {
    // initiate associate with other models (automatically called in ../models/index.js)
    static associate(models) {
      models.Player.hasMany(models.TransactionHistory, {
        as: "transactions",
        foreignKey: "playerId",
      });
      models.Player.hasMany(models.PlayerInventory, {
        as: "player_inventory_items",
        foreignKey: "playerId",
      });
    }

    // allow attributes for search
    static getAttributesForSearch() {
      return ["username", "email"];
    }

    // allow attributes for sort
    static getAttributesForSort() {
      return ["username", "email", "type", "createdAt"];
    }

    // allow attributes for filter
    static getAttributesForFilter() {
      return ["username", "email", "type", "createdAt"];
    }

    static hashPassword(password) {
      return bCrypt.hashSync(password, 10);
    }

    static comparePassword(password, hashPassword) {
      return bCrypt.compareSync(password, hashPassword);
    }

    static signToken(user) {
      return jsonWebToken.sign(
        {
          id: user.id,
          username: user.username,
          method: user.method,
          type: user.type,
        },
        config.jwtAuthKey,
        {
          expiresIn: config.tokenLoginExpiredDays,
        }
      );
    }

    static verifyToken(token) {
      return jsonWebToken.verify(token, config.jwtAuthKey);
    }

    generateSecretKey() {
      return jsonWebToken.sign(
        {
          id: this.id,
          username: this.username,
          method: this.method,
          type: this.type,
        },
        config.jwtAuthKey
      );
    }

    checkPassword(password) {
      return Player.comparePassword(password, this.password);
    }

    generateToken() {
      return Player.signToken(this);
    }
  }

  Player.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {
          is: {
            args: /^[a-zA-Z0-9]+$/i,
            msg: "username must contain only alphabet letters and numbers",
          },
          len: {
            args: [4, 64],
            msg: "username must between 4 and 64 characters",
          },
          isUnique: function (value, next) {
            User.findOne({
              where: {
                id: { [Sequelize.Op.ne]: this.id },
                username: value,
                deleted: constant.BOOLEAN_ENUM.FALSE,
              },
              attributes: ["id"],
            }).then(function (result) {
              if (result) {
                next(new Error("username must be unique"));
              }
              next();
            });
          },
        },
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: true,
        validate: {
          len: {
            args: [4, 20],
            msg: "password must between 6 and 20 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: true,
        validate: {
          len: {
            args: [0, 64],
            msg: "email must less than 64 characters",
          },
          isEmail: function (value, next) {
            if (value && !validator.isEmail(value)) {
              next(new Error("email must be unique"));
            }
            next();
          },
        },
      },
      displayName: {
        type: DataTypes.STRING(64),
        allowNull: true,
        validate: {
          len: {
            args: [0, 64],
            msg: "display name must between 2 and 64 characters",
          },
        },
      },
      type: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: constant.USER_TYPE_ENUM.END_USER,
        comment: JSON.stringify(constant.USER_TYPE_ENUM),
      },
      coin: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1000,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 100,
      },
      activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: constant.BOOLEAN_ENUM.FALSE,
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
      tableName: "tbl_player",
    }
  );

  Player.beforeCreate(function (player, options) {
    player.password = Player.hashPassword(player.password);
  });

  Player.beforeUpdate(function (player, options, next) {
    if (!player.coin) {
      player.password = Player.hashPassword(player.password);
    }
  });

  return Player;
};
