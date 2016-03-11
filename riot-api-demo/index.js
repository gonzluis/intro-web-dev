// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Set up middleware
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Port to run server on
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var port = 3000;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Require express and get it running
// Require body-parser
// Require express-handlebars and set it up
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require ('express-handlebars');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// INIT express engine
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', port);
app.use(express.static(__dirname + '/public'));


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Set express to use middleware(bodyParser)
//    parse application/x-www-form-urlencoded = handle URL encoded submissions
//    parse application/json = handle JSON submissions
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());










var key = process.argv.slice(2);
console.log("var key is: " + key);











// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Functions to render each page
//      This has the potential to be reduced...
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
app.get('/', function(req,res) {
    res.render('index');
    console.log(key);
    // any time a GET is received from the server, this runs
    // code can be looped here
    // basically any time the page is visited, this gets run
});

app.get('/page1', function(req,res) {
    res.render('page1');
});

app.get('/page2', function(req,res) {
    res.render('page2');
});

app.get('/page3', function(req,res) {
    res.render('page3');
});

app.get('/page4', function(req,res) {
    res.render('page4');
});

app.get('/page5', function(req,res) {
    res.render('page5');
});

function apiFreeToPlay() {
    var request = new XMLHttpRequest();
}








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
