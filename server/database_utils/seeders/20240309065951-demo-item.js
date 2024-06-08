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
        metadata: JSON.stringify({
          material: "Steel",
          weight: "5kg",
          damage: "20",
          durability: "100",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Health Potion",
        type: "Potion",
        description: "Restores health over time.",
        metadata: JSON.stringify({
          effect: "Heal 50 HP",
          duration: "30 seconds",
          color: "Red",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Magic Wand",
        type: "Weapon",
        description: "Casts powerful spells.",
        metadata: JSON.stringify({
          spell: "Fireball",
          range: "Medium",
          damage: "30",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shield",
        type: "Armor",
        description: "Protects against attacks.",
        metadata: JSON.stringify({
          material: "Iron",
          weight: "8kg",
          defense: "40",
          durability: "90",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bow",
        type: "Weapon",
        description: "Long-range weapon.",
        metadata: JSON.stringify({
          material: "Wood",
          arrowType: "Steel-tipped",
          range: "Long",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Arrow",
        type: "Ammunition",
        description: "Ammunition for bows.",
        metadata: JSON.stringify({
          material: "Wood",
          length: "30cm",
          tip: "Steel",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Helmet",
        type: "Armor",
        description: "Protects the head.",
        metadata: JSON.stringify({
          material: "Steel",
          weight: "3kg",
          defense: "20",
          durability: "95",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Boots",
        type: "Armor",
        description: "Increases movement speed.",
        metadata: JSON.stringify({
          material: "Leather",
          weight: "1.5kg",
          speedBoost: "10",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ring of Strength",
        type: "Accessory",
        description: "Increases physical strength.",
        metadata: JSON.stringify({
          effect: "Strength +10",
          slot: "Ring",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Amulet of Protection",
        type: "Accessory",
        description: "Reduces damage taken.",
        metadata: JSON.stringify({
          effect: "Damage Reduction 20",
          slot: "Amulet",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mana Potion",
        type: "Potion",
        description: "Restores mana.",
        metadata: JSON.stringify({
          effect: "Restore 50 MP",
          duration: "30 seconds",
          color: "Blue",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fire Scroll",
        type: "Scroll",
        description: "Casts a fire spell.",
        metadata: JSON.stringify({
          spell: "Fireball",
          power: "High",
          range: "Medium",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ice Scroll",
        type: "Scroll",
        description: "Casts an ice spell.",
        metadata: JSON.stringify({
          spell: "Ice Shard",
          power: "Medium",
          range: "Short",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Teleport Scroll",
        type: "Scroll",
        description: "Teleports the user to a specified location.",
        metadata: JSON.stringify({
          destination: "Town Square",
          range: "Long",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Invisibility Cloak",
        type: "Armor",
        description: "Makes the user invisible for a short duration.",
        metadata: JSON.stringify({
          duration: "60 seconds",
          rechargeTime: "5 minutes",
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(table);
  },
};
