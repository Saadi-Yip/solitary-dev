const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: "Please enter a valid email address"
    }
  },
  fname: {
    type: String,
    required: [true, "First Name is Required"]
  },
  lname: {
    type: String,
    required: [true, "Last Name is Required"]
  },
  phone: {
    type: String,
    required: [true, "Phone is Required"]
  },
  message: {
    type: String,
    required: [true, "Please enter a Message"]
  },
  createdAt:{
    type: Date,
    default: Date.now(),
    select: false
  }
});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
