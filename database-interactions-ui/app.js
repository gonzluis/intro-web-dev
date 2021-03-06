// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Port to run server on
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var port = 3001;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// All requires for this project
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require ('express-handlebars');
var session = require('express-session');
var request = require('request');
var mysql = require('mysql');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Set up express
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Set up database connection
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var pool = mysql.createPool({
    connectionLimit	    : 10,
    host  			    : 'localhost',
    user  			    : 'student',
    password			: 'default',
    database			: 'student'
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Functions used to render various parts of the page on event fire
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Default page
app.get('/', function(req, res) {
    var context = {};
    pool.query('SELECT * FROM workouts', function(err, rows, fields) {
        if (err)
            next(err);

        context.data = rows;
        console.log(context);
        res.render('home', context);
    });
});

// Delete table then re-init table, provided from instructor
app.get('/reset-table',function(req, res, next) {
    var context = {};
    pool.query("DROP TABLE IF EXISTS workouts", function(err) {

        var createString = "CREATE TABLE workouts("+
            "id INT PRIMARY KEY AUTO_INCREMENT,"+
            "name VARCHAR(255) NOT NULL,"+
            "reps INT,"+
            "weight INT,"+
            "date DATE,"+
            "lbs BOOLEAN)";
        pool.query(createString, function(err){
            context.results = "Table reset";
            res.render('home', context);
        })
    });
});

// Delete exercise by id number
app.get('/delete', function(req, res, next) {
    var context = {};
    pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, res) {
        if(err)
            next(err);

    });
    pool.query('SELECT * FROM workouts', function(err, rows, fields) {
        if (err)
            next(err);

        context.data = rows;
        res.render('home', context);
    });
});

// Add exercise to the table
app.get('/add', function(req, res, next) {
   var context = {};
    pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.type], function(err, res) {
        if (err)
            next(err);

    });
    pool.query('SELECT * FROM workouts', function(err, rows, fields) {
       if (err)
           next(err);

        context.data = rows;
        console.log(context);
        res.render('home', context);
    });
});

// Edit a row by id number
app.get('/edit', function(req, res, next) {
    var context = {};
    pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, rows, fields){
        if(err)
            next(err);
        context.data = rows;
        res.render('edit', context);
    });
});

// Post edit via an update with an id number
app.get('/update', function(req, res, next) {
    var context = {};
    pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id = ?", [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs, req.query.id], function(err, res){
        if(err)
            next(err);
    });
    pool.query("SELECT * FROM workouts", function(err, rows, fields){
        if (err)
            next(err);

        context.data = rows;
        res.render('home', context);
    });
});



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Error handling
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Not Found
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

// Internal server error
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Set up listener
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
app.listen(port, function() {
    console.log('Started on port(' + port + '): ' + app.get('port') + ', Ctrl C to end.');
});

