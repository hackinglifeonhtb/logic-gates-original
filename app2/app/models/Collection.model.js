const { Schema, model } = require("mongoose");

const collectionSchema = new Schema({
   collection_name: {
      type: String,
      required: true
   },
   collection_type: {
      type: String,
      required:true,
   },
   collection_products: {
      type: [Schema.Types.ObjectId],
      ref: 'Product'
   }
})
const Collection = model("Collection", courseSchema);

module.exports = Collection;