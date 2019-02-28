'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('users'),
    bcrypt = require('bcrypt'),
    jwt = require("jsonwebtoken"),
    fs = require('fs')

const SECRET_KEY = "secretkey23456";
// var PRIVATE_KEY = fs.readFileSync("../assets/keys/private.key", 'utf8');
// var PUBLIC_KEY = fs.readFileSync("../assets/keys/public.key", 'utf8');
//Displaying all the users
exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

//Creating a single user
exports.create_a_user = function(req, res) {
    const today = new Date();
    const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        created: today
    }

    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        res.json({
                            status: user.username + " registered"
                        })
                    }).catch(err => {
                        res.send('error ' + err)
                    })
            })
        } else {
            res.json({
                error: 'User already exists'
            })
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
};


//Displaying the single user
exports.read_a_user = function(req, res) {

    User.findOne({
        username: req.body.username
    }).then((user, err) => {

        if (err) return res.status(500).send('Server error!');
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    username: user.username,
                    password: user.password
                }
                const expiresIn = 24 * 60 * 60;
                const token = jwt.sign({
                        id: user.id
                    }, SECRET_KEY, {
                        expiresIn: expiresIn
                    })
                    // sets a cookie with the user's info
                req.session.userId = user._id;
                console.log('Cookies: ', req.cookies)
                return res.redirect('/dashboard');

            } else {
                return res.status(401).send('Password error!');
            }
        } else {
            return res.status(404).send('User not found!');
        }
    }).catch(err => {
        res.send('error: ' + err)
    })

};

exports.user_dashboard = (req, res) => {
    // console.log('Cookie: > ' + JSON.stringify(req));

    // if (req.session.userId == undefined) return res.send('No Sessions');
    User.findById(req.session.userId)
        .exec((error, user) => {
            if (res.status === 401) {
                res.send('Network Error');
            } else {
                if (user == null) {
                    var errr = new Error('Not Authorized! Go back!');
                    errr.status = 401;
                    // return next(errr);
                } else {
                    return res.send('<h1>Name: </h1>' + user.firstname + '<h2>Mail: </h2>' + user.lastname + '<br><a type="button" href="/">Logout</a>')
                }
            }
        })
}