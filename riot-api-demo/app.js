
// Port to be used
var port = 3000;

// Require stuff
var express = require("express");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars").create({defaultLayout:'main'});

// Init express
var app = express();
app.engine('handlebars', handlebars.engine);
app.set('port', port);
var options = { root: __dirname + '/' };


// Make express use body-parser as middleware
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
