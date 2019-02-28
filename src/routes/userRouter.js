'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('users')
    //Creating the module/ function for maintaining routes
module.exports = function(app) {

    //Get the CRUD methods of users from userController
    var userList = require('../controllers/userController');

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //Route to the /users
    app.route('/users')
        .get(userList.list_all_users)
        .post(userList.create_a_user);

    //Route for single user
    app.route('/login')
        .post(userList.read_a_user)

    //Route for user dashboard
    app.route('/dashboard')
        .get(userList.user_dashboard)

}