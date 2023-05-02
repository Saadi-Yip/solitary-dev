const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let testimonialsSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, "Name is required!"],
  },
  createdAt:{
    type: Date,
    default: Date.now(),
    select: false
  },
  description:{
    type: String,
    required: [true, "Description is Required"]
  },
  image:{
    type: String,
    required: [true, "Testimonial Image is Required"]
  },
  rating: {
    type: String,
    enum: [1, 2, 3, 4, 5]  
  },
  designation:{
    type: String
  }
});
const Testimonial = mongoose.model("Testimonial", testimonialsSchema);
module.exports = Testimonial;
