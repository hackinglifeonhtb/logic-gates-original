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
   tags: {
    type: Object,
    default: [
      {tag:'مشاريع',provided:false},
      {tag:'مشكلة برمجية',provided:false},
      {tag:'استفسار تقني عام',provided:false},
      {tag:'استفسار برمجي',provided:false},
      {tag:'شرح مناهج',provided:false},
      {tag:'مشكلة بالمنصة',provided:false},
      {tag:'افتراح',provided:false}
    ]
   },
   date: {
    type: String,
   }
})
const Consultation = model("Consultation", consultationSchema);

module.exports = Consultation;