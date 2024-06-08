const mongoose = require("mongoose");

const ItemDetailSchema = new mongoose.Schema({
  item_id: { type: Number, required: true },
  metadata: { type: Object, required: true }
},);

const ItemDetail = mongoose.model("item_details", ItemDetailSchema);

module.exports = ItemDetail;
