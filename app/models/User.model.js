const { Schema, model } = require("mongoose");

const userSchema = new Schema({
   "firstName": {
     type: String,
     required: true
   },
   secondName: {
    type: String,
    required: true
   },
   email: {
    type: String,
     required: true,
     unique: true
   },
   password: {
      type: String,
     required: true
   },
   curr_status: {
    type: String,
     required: true
   },
   token: {
    type: String,
     required: true
   },
   courses_enrolled_in: {
     type: Array,
     default: []
   },
   manager: {
    type: Boolean,
    default: false
   },
   exams: {
    type: Array,
    default: []
   },
   tests_subscribed: {
    type: Array,
    default: []
   },
   tests_bought: {
    type: Array,
    default: []
   },
   subscribed: {
    type: Boolean,
    default: false
   },
   consultations: {
    type: Array,
    default: []
   },
   consultationer: {
    type: Boolean,
    default: false
   },
   taken_consultations: {
    type: Array,
    default: []
   },
   notifications: {
    type: Array,
    default: []
   }
})
const User = model("User", userSchema);

module.exports = User;