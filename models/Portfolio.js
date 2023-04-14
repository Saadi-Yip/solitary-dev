const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Project Name is Required!"],
  },
  image: {
    type: String,
    required: [true,"Project must have Image"],
  },
  image_id: {
    type: String,
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  url: {
    type: String,
    required: [true,"Provider Url is Required!"]
  },
  createdAt:{
    type: Date,
    default: Date.now(),
    select: false
  }  
});
const Portfolio = mongoose.model("Project", portfolioSchema);
module.exports = Portfolio;
