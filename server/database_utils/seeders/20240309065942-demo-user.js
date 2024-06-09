/* eslint-disable no-unused-vars */
const bCrypt = require("bcryptjs");
const constant = require("../../app/utils/constant.utils");
const config = require("../../app/configs/general.config");
const table = { schema: "game_server", tableName: "tbl_player" };

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(table, [
      {
        username: "admin",
        email: "admin@gmail.com",
        displayName: "Admin",
        password: bCrypt.hashSync("admin", 10),
        type: constant.USER_TYPE_ENUM.SUPER_ADMIN,
        coin: 10000,
        capacity: 100,
        activated: constant.BOOLEAN_ENUM.TRUE,
      },
      {
        username: "player1",
        email: "player1@gmail.com",
        displayName: "Mechanical",
        password: bCrypt.hashSync("player1", 10),
        type: constant.USER_TYPE_ENUM.END_USER,
        coin: 10000,
        capacity: 100,
        activated: constant.BOOLEAN_ENUM.TRUE,
      },
      {
        username: "player2",
        email: "player2@gmail.com",
        displayName: "player2",
        password: bCrypt.hashSync("player2", 10),
        type: constant.USER_TYPE_ENUM.END_USER,
        coin: 10000,
        capacity: 100,
        activated: constant.BOOLEAN_ENUM.TRUE,
      },
      {
        username: "player3",
        email: "player3@gmail.com",
        displayName: "player3",
        password: bCrypt.hashSync("player3", 10),
        type: constant.USER_TYPE_ENUM.END_USER,
        coin: 10000,
        capacity: 100,
        activated: constant.BOOLEAN_ENUM.TRUE,
      },
      {
        username: "player4",
        email: "player4@gmail.com",
        displayName: "player4",
        password: bCrypt.hashSync("player4", 10),
        type: constant.USER_TYPE_ENUM.END_USER,
        coin: 10000,
        capacity: 100,
        activated: constant.BOOLEAN_ENUM.TRUE,
      },
      {
        username: "player5",
        email: "player5@gmail.com",
        displayName: "Mechanical",
        password: bCrypt.hashSync("player5", 10),
        type: constant.USER_TYPE_ENUM.END_USER,
        coin: 10000,
        capacity: 100,
        activated: constant.BOOLEAN_ENUM.TRUE,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(table);
  },
};
