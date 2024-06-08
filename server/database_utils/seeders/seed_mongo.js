const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://poman:57smrvp89Rd6Nuu7@cluster0.1zk4jxc.mongodb.net/ItemManagement?retryWrites=true&w=majority&appName=Cluster0", {});

const PlayerInventorySchema = new mongoose.Schema({
  player_id: { type: Number, required: true },
  items: [{ item_id: Number, quantity: Number }],
});

const ItemDetailSchema = new mongoose.Schema({
  item_id: { type: Number, required: true },
  metadata: { type: Object, required: true },
});

const PlayerInventory = mongoose.model("player_inventories", PlayerInventorySchema);
const ItemDetail = mongoose.model("item_details", ItemDetailSchema);

async function seed() {
  await PlayerInventory.deleteMany({});
  await ItemDetail.deleteMany({});

  // Create multiple players
  const playerInventories = [];
  for (let i = 1; i <= 5; i++) {
    playerInventories.push({
      player_id: i,
      items: [
        { item_id: 1, quantity: Math.floor(Math.random() * 10) + 1 },
        { item_id: 2, quantity: Math.floor(Math.random() * 10) + 1 },
        { item_id: 3, quantity: Math.floor(Math.random() * 10) + 1 },
        { item_id: 4, quantity: Math.floor(Math.random() * 10) + 1 },
        { item_id: 5, quantity: Math.floor(Math.random() * 10) + 1 },
      ],
    });
  }

  // Create multiple item details
  const itemDetails = [
    { item_id: 1, metadata: { damage: 10, durability: 100 } },
    { item_id: 2, metadata: { healing: 50, duration: 5 } },
    { item_id: 3, metadata: { magic: 25, recharge_time: 30 } },
    { item_id: 4, metadata: { speed: 5, stamina: 50 } },
    { item_id: 5, metadata: { protection: 20, weight: 10 } },
    { item_id: 6, metadata: { attack: 15, accuracy: 80 } },
    { item_id: 7, metadata: { fire_damage: 30, burn_time: 10 } },
    { item_id: 8, metadata: { ice_damage: 20, freeze_time: 15 } },
    { item_id: 9, metadata: { lightning_damage: 25, shock_time: 5 } },
    { item_id: 10, metadata: { poison_damage: 18, effect_time: 12 } },
    { item_id: 11, metadata: { health_boost: 50, duration: 30 } },
    { item_id: 12, metadata: { mana_boost: 40, recharge_time: 20 } },
    { item_id: 13, metadata: { invisibility: 5, duration: 60 } },
    { item_id: 14, metadata: { strength_boost: 15, duration: 45 } },
    { item_id: 15, metadata: { agility_boost: 10, duration: 50 } },
    { item_id: 16, metadata: { intellect_boost: 20, duration: 40 } },
    { item_id: 17, metadata: { charisma_boost: 25, duration: 35 } },
    { item_id: 18, metadata: { luck_boost: 30, duration: 25 } },
    { item_id: 19, metadata: { endurance_boost: 35, duration: 20 } },
    { item_id: 20, metadata: { wisdom_boost: 40, duration: 15 } },
  ];

  await PlayerInventory.insertMany(playerInventories);
  await ItemDetail.insertMany(itemDetails);

  console.log("MongoDB seed data created successfully.");
  mongoose.connection.close();
}

seed().catch(console.error);
