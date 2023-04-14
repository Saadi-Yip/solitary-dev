const Project = require("../models/Portfolio");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");
module.exports = {
  
  /*** Add Project to Database ***/
  input_project: async (req, res) => {
    const { name, url, category } = req.body;

    if(!req.file) {
        res.status(404).json({message:"Project Image is Required!!"});
        return true;
     }  
     let image_upload = await cloudinary.uploader.upload(req.file.path);
     console.log(image_upload);
    try {
      let data = {
          name,
          url,
          image: image_upload && image_upload.secure_url,
          image_id:image_upload && image_upload.public_id,
          category:mongoose.Types.ObjectId(category),
      }
      const project = await Project.create(data);
      res.status(200).json({
        status:'success', 
        data:{
          project
        }
      });
    }  
    catch (err) {
        res.status(401).json({status:'fail', message:err.message});
    }
  },

  /*** Get Projects from Database ***/
  get_project: async (req, res) => {
    try {
        let projects = await Project.find();
        res.status(200).json({
          status:'success',
          results: projects.length,
          data: {
            projects
          }
        });
    } catch (err) { 
        res.status(401).json({status: 'fail', message: err.message});
    }
  },

  /*** edit an existing Project ***/
  edit_project: async (req, res) => {
    try {
      let project =  await Project.findById(req.params.id)
      res.status(200).json({
        status:'success', 
        data: {
          project
        }
      })
    } catch (err) {
      res.status(401).json({status:'fail', message: err.message})
    }
      
  },

  update_project: async(req, res) => {
    try {
      const {name, url, category} = req.body;
      let image_upload;
      if(req.file) {
        let record = await Project.findById(req.params.id);
        console.log(record);
        await cloudinary.uploader.destroy(record.image_id);
         image_upload = cloudinary.uploader.upload(req.file.path);
      }
      let data = {
        name: name && name,
        url: url && url,
        category: category&&category,
        image: image_upload&&image_upload.secure_url,
        image_id: image_upload&&image_upload.public_id
      }
      const project = await Project.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true
      });
        res.status(200).json({
          status:'success', 
          data:{
            project
          }
        });
    } catch (err) {
        res.json({status:'fail', message: err.message});
    }
  },

  /*** Remove a Project ***/
  remove_project : async (req, res) => {
    try {
      let result = await Project.findById(req.params.id);
      await Project.findByIdAndDelete(req.params.id);
      await cloudinary.uploader.destroy(result.image_id)
      res.status(204).json({status:'success', data:null});
    } catch (err) {
      res.status(404).json({status:'fail', message: err.message})
    }
  }, 
};
