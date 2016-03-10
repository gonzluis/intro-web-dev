

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Set up middleware
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Import and init express
var express = require("express");
var app = express();

// Import and init body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

// Import and init express-handlebars
var handlebars = require("express-handlebars").create({defaultLayout:'main'});

// Init express rendering tools
app.engine('handlebars', handlebars.engine);
app.set('port', port);


// Set static information for server
var port = 3000;
app.use(express.static(__dirname + '/public'));













// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Error handling, codes from Riot Inc
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// 4XX Codes
// Bad request
app.use(function(req, res, next){
    res.status(400);
    res.render('400');
});

// Unauthorized
app.use(function(req, res, next){
    res.status(401);
    res.render('401');
});

// Not Found
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

// Unsupported Media Type
app.use(function(req, res, next){
    res.status(415);
    res.render('415');
});

// Rate limit exceeded
app.use(function(req, res, next){
    res.status(429);
    res.render('429');
});


// 5XX Codes
// Internal server error
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// Service unavailable
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(503);
    res.render('503');
});





// Set up listener
app.listen(port, function() {
    console.log('Started on port(' + port + '): ' + app.get('port') + ', Ctrl C to end.');
});
