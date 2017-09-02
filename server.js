'use strict';
//load packages
var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 3000;
app.set('port', process.env.PORT || port);
//var io = require('socket.io')(server);
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
//var session = require('express-session');
var path = require('path');
var Heroes = require('./server/heroes/heroes.model');
var heroesFakeData = require('./server/testUtils/heroesFakeData');

console.log(heroesFakeData);

var heroesApi = require('./server/heroes/heroes.api');


//----------------------------------------------------------------------
//custom methods
//----------------------------------------------------------------------

/*MONGODB--------------------------------------------------*/

/*Config db*/
var mDb = 'apolliceHeroes' //Databae name
var dbUrl = 'localhost/' + mDb;
mongoose.connect('mongodb://' + dbUrl);
//check if connected
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('connected to database');


    /*We use bellow just to check if there is no heroes in db an then we add some (For test only)*/
    Heroes.find({}, function (error, heroes) {
        if (error) {
            console.log(error);
        } else if (!heroes || heroes.length < 1) {
            //Insert heroes
            console.log('no heoroes, creating new ones');
            heroesFakeData.forEach(function (hero) {
                var newHeroes = new Heroes(hero);
                newHeroes.save(function (err, data) {
                    if (err) console.log(err);
                    console.log(data);
                })
            })
        }
    });

});

/*Express config*/
app.use(cors());
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
    extended: false
})); // get information from html forms

//use static files
app.use(express.static(path.join(__dirname, './src')));
app.use(express.static(path.join(__dirname, './')));




/*Routes*/
//load my routes
require('./server/heroes/heroes.routes')(app, express, heroesApi);


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + './src/index.html'));
});


server.listen(process.env.PORT || port, function () {
    console.log('App listening on port ' + port);
});
