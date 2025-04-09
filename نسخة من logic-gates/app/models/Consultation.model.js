const { Schema, model } = require("mongoose");

const consultationSchema = new Schema({
   consultation_opener_id: {
    type: String,
    required: true,
   },
   messages: {
     type: Array,
     default: []
   },
   Taken: {
    type:Boolean,
    default: false
   },
   TakenFromID: {
    type:String
   },
   date: {
    type: String,
   }
})
const Consultation = model("Consultation", consultationSchema);

module.exports = Consultation;