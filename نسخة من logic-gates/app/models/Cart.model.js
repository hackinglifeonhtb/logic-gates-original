const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
   user_id: {
      type: String,
      required: true
   },
   products_id: {
    type: Array,
    required: true
   },
   number: {
    type: Number
   }
})
const Cart = model("Cart", cartSchema);

module.exports = Cart;