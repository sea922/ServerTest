const mongoose = require("mongoose");

const PlayerInventorySchema = new mongoose.Schema({
  player_id: { type: Number, required: true },
  items: [{ item_id: Number, quantity: Number }],
});

const PlayerInventory = mongoose.model("player_inventories", PlayerInventorySchema);

module.exports = PlayerInventory;
