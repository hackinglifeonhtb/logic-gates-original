const { Schema, model } = require("mongoose");

const productSchema = new Schema({
   product_name: {
      type: String,
      required: true
   },
   product_describe: {
    type: String,
    required: true
   },
   product_pic: {
    type: String,
    required: true
   },
   tags: {
    type: Array,
    required: true
   },
   sizes: {
      type: Array,
      required: true
   },
   price: {
      type: String,
      required: true
   },
   byMeter: {
      type: Boolean,
   }
   /*product_collection: {
      type: Schema.Types.ObjectId,
      ref: 'Collection'
   }*/
})
const Product = model("Product", productSchema);

module.exports = Product;