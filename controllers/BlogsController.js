const Blogs = require('../models/Blogs');
const cloudinary = require("../utils/cloudinary");
module.exports = {
 
    /*** Add Blog Message to Database ***/
  add_blog: async (req, res) => {  
    const {title, tag, author, content} = req.body;
    if(!req.file) {
        res.status(404).json({message:"Blog Image is Required!!"});
        return true;
     }  
     let image_upload = await cloudinary.uploader.upload(req.file.path);
     console.log(image_upload);
    try {
        console.log(req.body);
        const data = {
            title, 
            blog_image: image_upload && image_upload.secure_url,
            image_id:image_upload && image_upload.public_id,
            tag,
            author,
            content
        }
        const blog = await Blogs.create(data);
        res.status(200).json({
          status:'success', 
          data:{
            blog
          }
        });
    }  
    catch (err) {
        res.status(401).json({status: 'fail', message:err.message});
    }
  },

  /*** Get Blogs from Database ***/
  get_blog: async (req, res) => {
    try {

        // Filteration
        let queryObj = {...req.query};
        let excludedFields = ['page', 'limit', 'sort', 'fields'];
        excludedFields.forEach(field => delete queryObj[field]);
        
        // Advance Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`);
        console.log(JSON.parse(queryStr));
  
  
        let query = Blogs.find(JSON.parse(queryStr));
        
        // Sorting
        if(req.query.sort) {
          const sortBy = req.query.sort.split(',').join(' ');
          query = query.sort(sortBy);
        } else {
          query = query.sort('-createdAt');
        }
  
        //Fields Limiting
  
        if (req.query.fields) {
          const fields = req.query.fields.split(',').join(' ');
          query = query.select(fields);
        } else {
          query = query.select('-__v');
        }
  
        //Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        
        query = query.skip(skip).limit(limit);
        
        if(req.query.page) {
          const data = await Blogs.countDocuments();
          if(skip >= data) throw new Error("This page does not exist");
        }
        // Execute the Query
        const blogs = await query;
   
          res.status(200).json({
            status:'success',
            results: projects.length,
            data: {
              blogs
            }
          });
      } catch (err) { 
        res.status(401).json({status:'fail', message: err.message});
    }
  },

  /*** edit an existing blog message ***/
  single_blog: async (req, res) => {
    try {
      const blog =  await Blogs.findById(req.params.id)
      res.status(200).json({
        status:'success', 
        data: {
          blog
        }
      })
    } catch (err) {
      res.status(401).json({status:'fail', message: err.message})
    }
      
  },

    /*** Update blog ***/
   update_blog: async(req, res) => {
    try {
        const {title, blog_image, tag, author, content} = req.body;

        let image_upload;
      if(req.file) {
        let record = await Blogs.findById(req.params.id);
        console.log(record);
        await cloudinary.uploader.destroy(record.image_id);
         image_upload = await cloudinary.uploader.upload(req.file.path);
      }
      console.log(image_upload);
      
      const data = {
        title, 
        blog_image,
        blog_image: image_upload&&image_upload.secure_url,
        image_id: image_upload&&image_upload.public_id,
        tag,
        author,
        content
      }
      const blog = await Blogs.findByIdAndUpdate(req.params.id,data, {
        new: true,
        runValidators: true
      });
        res.status(200).json({
          status:'success', 
          data:{
            blog
          }
          });
    } catch (err) {
        res.status(401).json({status:'fail', message:err.message});
    }
  },

  /*** Remove a Message ***/
  remove_blog : async (req, res) => {
    try {
        let result = await Blogs.findById(req.params.id);
        await Blogs.findByIdAndDelete(req.params.id);
      await cloudinary.uploader.destroy(result.image_id);
      res.status(204).json({status:'success', data: null});
    } catch (err) {
      res.status(404).json({status:'fail', message: err.message})
    }
  }, 
};


 