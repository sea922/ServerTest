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
        buyPrice: 100,
        sellPrice: 4,
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
        sellPrice: 4,
        buyPrice: 50,
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
        buyPrice: 200,
        sellPrice: 4,
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
        buyPrice: 150,
        sellPrice: 4,
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
        buyPrice: 300,
        sellPrice: 4,
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
        buyPrice: 80,
        sellPrice: 4,
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
        buyPrice: 120,
        sellPrice: 4,
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
        buyPrice: 250,
        sellPrice: 4,
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
        buyPrice: 180,
        sellPrice: 4,
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
        buyPrice: 220,
        sellPrice: 4,
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
        buyPrice: 220,
        sellPrice: 4,
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
        buyPrice: 220,
        sellPrice: 4,
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
        buyPrice: 220,
        sellPrice: 4,
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
        buyPrice: 220,
        sellPrice: 4,
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
        buyPrice: 220,
        sellPrice: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(table);
  },
};
