const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let blogsSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: [true, "Blog Title is Required!"], 
  },
  createdAt:{
    type: Date,
    default: Date.now(), 
  },
  blog_image: {
    type: String,
    required: [true, "Blog Image is Required"]
  },
  image_id: {
    type: String,
  },
  tag: {
    type: String,
    required: [true, "Blog's Tag is Required"]
  },
  author: {
    type: String,
    required: [true, "Blog must have an Author"]
  },
  content: {
    type: String,
    required: [true, "Blog must have Content"]
  }
});
const Blogs = mongoose.model("Blog", blogsSchema);
module.exports = Blogs;
