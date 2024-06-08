/* eslint-disable no-unused-vars */
const bCrypt = require("bcryptjs");
const constant = require("../../app/utils/constant.utils");
const config = require("../../app/configs/general.config");
const table = { schema: "game_server", tableName: "tbl_item" };

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(table, [
      {
        name: "Sword",
        type: "Weapon",
        description: "A sharp blade for combat.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Health Potion",
        type: "Potion",
        description: "Restores health over time.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Magic Wand",
        type: "Weapon",
        description: "Casts powerful spells.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shield",
        type: "Armor",
        description: "Protects against attacks.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bow",
        type: "Weapon",
        description: "Long-range weapon.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Arrow",
        type: "Ammunition",
        description: "Ammunition for bows.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Helmet",
        type: "Armor",
        description: "Protects the head.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Boots",
        type: "Armor",
        description: "Increases movement speed.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ring of Strength",
        type: "Accessory",
        description: "Increases physical strength.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Amulet of Protection",
        type: "Accessory",
        description: "Reduces damage taken.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mana Potion",
        type: "Potion",
        description: "Restores mana.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fire Scroll",
        type: "Scroll",
        description: "Casts a fire spell.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ice Scroll",
        type: "Scroll",
        description: "Casts an ice spell.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Teleport Scroll",
        type: "Scroll",
        description: "Teleports the user to a specified location.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Invisibility Cloak",
        type: "Armor",
        description: "Makes the user invisible for a short duration.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(table);
  },
};
