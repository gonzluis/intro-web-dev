// Port to run server on
var port = 3000;

// Require express and get it running
var express = require("express");
var app = express();

// Require body-parser
var bodyParser = require("body-parser");

// Require handlebars and set it up
var handlebars = require ("express-handlebars").create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', port);

// Set express port and home dir
app.set('port', port);
var options = { root: __dirname + '/' };

// Set express to use middleware(bodyParser)
// 1. parse application/x-www-form-urlencoded
// 2. parse application/json
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Prints req url, method, and type, then contents
app.use(function(req,res,next) {
  console.log('\turl:%s,\n\tmethod:%s\n\tpath:%s', req.url, req.method, req.path);
  console.log('body:', req.body);
  next();
});

app.get('/', function(req,res) {
  res.render('index');
});

// app.get('/getform', function(req,res) {
//   res.type('text/html');
//   res.sendFile('getform.html', options);
// });

// Listen on active port
app.listen(port, function() {
  console.log('Started on port: ' + port + ', Ctrl C to end.');
});
