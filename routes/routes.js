const express = require("express");
const router = express.Router();
const upload = require("../middleware/MulterMiddleware");

//-- *********** Import Controller Functions *********** --// 
const ContactController = require("../controllers/ContactController");
const CategoryController = require("../controllers/CategoryController");
const PortfolioController = require('../controllers/PortfolioController');
const BlogsController = require('../controllers/BlogsController');
const AuthController = require("../controllers/AuthController");
const TagsController = require("../controllers/TagsController");
//!!  ********************* Routes ********************* --// 
require('dotenv').config()

router.get("/", (req, res) => {
  res.send("Solitary Dev Api")
})

// Login Route
router.post("/login", AuthController.Login);


//! *** Contact Us Routes *** !//
router.route("/contact")
  .get(ContactController.get_contact_us) /*** Get all Messagess ***/
  .post(ContactController.input_contact_us) /*** Add New Message ***/
router.route("/contact/:id")
  .get(ContactController.edit_contact_us) /*** Get a Single Message ***/
  .patch(ContactController.update_contact_us) /*** Update Message ***/
  .delete(ContactController.remove_contact_us) /*** Remove Message ***/

//! *** Category Routes ***!//
router.route("/category")
  .get(CategoryController.get_category) /*** Get all Category ***/
  .post(CategoryController.input_category) /*** Add New Category ***/
router.route("/category/:id")
  .get(CategoryController.edit_category) /*** Get a Single Category ***/
  .patch(CategoryController.update_category) /*** Update Category ***/
  .delete(CategoryController.remove_category) /*** Remove Category ***/


//! *** Portfolio Routes ***!//
router.get("/project", PortfolioController.get_project) /*** Get all Project ***/
router.post("/project", upload.single('image'), PortfolioController.input_project) /*** Add New Project ***/
router.route("/project/:id")
  .get(PortfolioController.edit_project) /*** Get a Single Project ***/
  .patch(upload.single('image'), PortfolioController.update_project) /*** Update Project ***/
  .delete(PortfolioController.remove_project) /*** Remove Project ***/


//! *** Blogs Routes ***!//
router.get("/blog", BlogsController.get_blog) /*** Get all Blogs ***/
router.post("/blog", upload.single('blog'), BlogsController.add_blog) /*** Add New Blogs ***/
router.route("/blog/:id")
  .get(BlogsController.single_blog) /*** Get a Single Blogs ***/
  .patch(upload.single('blog'), BlogsController.update_blog) /*** Update Blogs ***/
  .delete(BlogsController.remove_blog) /*** Remove Blogs ***/


  //! *** Tags Routes ***!//
router.get("/tag", TagsController.get_tag) /*** Get all Blogs ***/
router.post("/tag", TagsController.add_tag) /*** Add New Blogs ***/
router.route("/tag/:id")
  .get(TagsController.edit_tag) /*** Get a Single Blogs ***/
  .patch(upload.single('tag'), TagsController.update_tag) /*** Update Blogs ***/
  .delete(TagsController.remove_tag) /*** Remove Blogs ***/

// -- /*** Export all Routes ***/ -- // 
module.exports = router;


