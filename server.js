// set up =====================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.js')[env];
var configDB = require('./config/database.js')[env];

// configuration ==============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function () {
    app.use(express.static(config.root + '/public'));

    // set up our express application
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms

    app.set('view engine', 'jade'); // set up ejs for templating

    // required for passport
    app.use(express.session({
        secret: 'ThisCakeIsALie'
    })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./app/routes.js')(app, passport);

// launch =====================================================================
app.listen(port);
console.log('App started on port ' + port);
