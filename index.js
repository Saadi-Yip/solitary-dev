const express = require("express");
require("./db");
const app = express();
const path = require("path");
const cors = require("cors"); 
const routes = require('./routes/routes');  
var multer = require('multer');
var upload = multer({dest:'public/uploads'});
const PORT = process.env.PORT || 5000; 
const bodyParser = require('body-parser');
/************** Middlewares ****************/
app.use(express.static(path.resolve('./public')));
app.use(express.json({limit: '10kb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.single('image')); 
app.use(express.static('public'));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});
let corsOptions = {
    origin: '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));
 

/************** Routes ****************/
app.use('/' ,routes); /*** Application Route ***/ 

app.all('*', (req,res,next) =>{
  res.send({message:"Invalid Route"})
})


/*** Listen to Port ***/
app.listen(PORT);
module.exports = app;


