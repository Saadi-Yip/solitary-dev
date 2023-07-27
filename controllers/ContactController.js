const Contact = require("../models/Contact");
const { AppError } = require('../utils/errorHandling'); 
module.exports = {
  /*** Add Contact Us Message to Database ***/
  input_contact_us: async (req, res, next) => {
    try {
      const { email, message, fname, lname, phone } = req.body;
      let data = { email, message, fname, lname, phone };
      const contact_us = await Contact.create(data);
      res.status(200).json({
        status: "success",
        data: {
          contact_us,
        },
      });
    } catch (err) {
      next(err)
    }
  },
  /*** Get Contact Us messages from Database ***/
  get_contact_us: async (req, res) => {
    try {
      // Filteration
      let queryObj = { ...req.query };
      let excludedFields = ["page", "limit", "sort", "fields"];
      excludedFields.forEach((field) => delete queryObj[field]);

      // Advance Filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      console.log(JSON.parse(queryStr));

      let query = Contact.find(JSON.parse(queryStr));

      // Sorting
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }

      //Fields Limiting

      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }

      //Pagination
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 10;
      const skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);

      if (req.query.page) {
        const data = await Contact.countDocuments();
        if (skip >= data) throw new Error("This page does not exist");
      }
      // Execute the Query
      const contact_us = await query;

      // Send the Response
      res.status(200).json({
        status: "success",
        results: contact_us.length,
        data: {
          contact_us,
        },
      });
    } catch (err) {
      res.status(500).json({ status: "fail", message: err.message });
    }
  },
  /*** edit an existing contact us message ***/
  edit_contact_us: async (req, res) => {
    try {
      let contact_us = await Contact.findById(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          contact_us,
        },
      });
    } catch (err) {
      res.status(500).json({ status: "fail", message: err.message });
    }
  },
  update_contact_us: async (req, res) => {
    try {
      console.log(req.body);
      const contact_us = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: {
          contact_us,
        },
      });
    } catch (err) {
      res.status(401).json({ status: "fail", message: err.message });
    }
  },
  /*** Remove a Message ***/
  remove_contact_us: async (req, res) => {
    try {
      await Contact.findByIdAndDelete(req.params.id);
      res.status(204).json({ status: "success", data: null });
    } catch (err) {
      res.status(404).json({ status: "fail", message: err.message });
    }
  },
};
