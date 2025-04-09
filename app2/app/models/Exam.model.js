const { Schema, model } = require("mongoose");

const examSchema = new Schema({
   topic: {
    type:String,
    required:true
   },
   desc: {
    type: String,
    required:true
   },
   questions: {
    type: Array,
     required: true
   },
   curr_status: {
    type: Boolean,
    default: false
   },
   successResult: {
    type:Number,
    default: 80
   },
   price: {
      type: Number,
      default: 5
   }
})
const Exam = model("Exam", examSchema);

module.exports = Exam;