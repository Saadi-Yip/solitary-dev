const express = require("express");
const router = express.Router(); 
const upload = require("../middleware/MulterMiddleware");  
//-- *********** Import Controller Functions *********** --// 
const ContactController = require("../controllers/ContactController"); 
const CategoryController = require("../controllers/CategoryController");
const PortfolioController = require('../controllers/PortfolioController');
const WebhookController = require('../controllers/WebhookController');
//-- ********************* Routes ********************* --// 

router.get("/", (req,res) =>{
  res.send("Solitary Dev Api")
})

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
  router.get("/project",PortfolioController.get_project) /*** Get all Project ***/
  router.post("/project", upload.single('image'), PortfolioController.input_project) /*** Add New Project ***/
router.route("/project/:id")
  .get(PortfolioController.edit_project) /*** Get a Single Project ***/
  .patch(upload.single('image'), PortfolioController.update_project) /*** Update Project ***/
  .delete(PortfolioController.remove_project) /*** Remove Project ***/

  router.get("/webhook",  WebhookController.GetWebhook);
  router.post("/webhook", WebhookController.PostWebHook);
  
  // Facebook API
  router.get("/messaging-webhook", WebhookController.getFacebook);


// -- /*** Export all Routes ***/ -- // 
module.exports = router;


 