'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('../face-web/src/models/userModel'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    expressVue = require("express-vue"),
    MongoStore = require('connect-mongo')(session),
    cookieParser = require('cookie-parser')

require('dotenv').config();

const cors = require('cors');
const expressVueMiddleware = expressVue.init();


const corsOptions = {
    origin: 'http://localhost:8081',
    credentials: true
}
app.use(cors(corsOptions));
// var user = require('../face-web/src/models/userModel');
app.use(expressVueMiddleware);
mongoose.Promise = global.Promise;

//Connecting to mongo db using mongoose
const mongoAtlasUrl = 'mongodb+srv://kishore189:kishore189@faceusers-fvxei.mongodb.net/fwusers?retryWrites=true';
const mongodbLocalUrl = 'mongodb://localhost:27017/faceUsers';
mongoose.connect(mongodbLocalUrl)
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
mongoose.set('debug', true);
var db = mongoose.connection;

//Using body parser for express
//Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true
}));

//Supports parsing of application/json type post data
app.use(bodyParser.json());

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
// delete process.env['http_proxy'];
// delete process.env['HTTP_PROXY'];
// delete process.env['https_proxy'];
// delete process.env['HTTPS_PROXY'];
app.use(cookieParser());
//Configuring sessions
app.use(session({
    name: 'session',
    secret: 'secretkey23456',
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: false,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        autoRemove: 'native'
    },
    store: new MongoStore({
        mongooseConnection: db,
        ttl: 24 * 60 * 60
    })
}));

app.get('/', function(req, res) {
    if (req.session.page_views) {
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});

//Getting all the routes and passing the express to that function
var routes = require('../face-web/src/routes/userRouter');
routes(app);

//Listening to the port/ connecting to the server
app.listen(port);

//Debug for the connection
console.log('User List Started on ' + port);