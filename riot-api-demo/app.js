
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

// Landing page, via main.hbs
app.get('/', function(req,res) {
    res.render('main');
});

$(function() {
    // Grab the template script
    var theTemplateScript = $("#address-template").html();

    // Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);

    // Define our data object
    var context={
        "city": "London",
        "street": "Baker Street",
        "number": "221B"
    };

    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $('.content-placeholder').html(theCompiledHtml);
});