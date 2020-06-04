"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../modal/user');
var config = require('config');
var jwt = require('jsonwebtoken');
var auth = require("../middleware/auth");
router.post('/register', function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password, confirmpassword = _a.confirmpassword, number = _a.number, state = _a.state;
    User.findOne({ email: email }).then(function (user) {
        if (user)
            return res.status(400).json("ERROR!!!!!!!!!!\nEMAIL ID ALREADY EXISTS");
        var newuser = new User({
            name: name,
            email: email,
            password: password,
            confirmpassword: confirmpassword,
            number: number,
            state: state
        });
        bcrypt.genSalt(10, function (err1, salt) {
            bcrypt.hash(newuser.password, salt, function (err1, hash1) {
                if (err1)
                    throw err1;
                newuser.password = hash1;
                bcrypt.genSalt(10, function (err2, salt) {
                    bcrypt.hash(newuser.confirmpassword, salt, function (err2, hash2) {
                        if (err2)
                            throw err2;
                        newuser.confirmpassword = hash2;
                        newuser.save()
                            .then(function (user) {
                            res.json(user.id);
                        });
                    });
                });
            });
        });
    });
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    User.findOne({ email: email }).then(function (user) {
        if (!user)
            return res.status(400).json("ERROR!!!!!!!!!!\nEMAIL ID DOES NOT EXIST");
        bcrypt.compare(password, user.password)
            .then(function (ismatch) {
            if (!ismatch)
                return res.status(400).json("ERROR!!!!!!!!!!\nINVALID PASS");
            jwt.sign({ id: user.id }, config.get('jwtsecret'), { expiresIn: 3600 }, function (err, token) {
                if (err)
                    throw err;
                else
                    res.json({ token: token, id: user.id, name: user.name, email: user.email });
            });
        });
    });
});
var validuser = function (req, res, next) {
    var token = req.header('auth-token');
    req.token = token;
    next();
};
router.get('/getuser', auth, function (req, res) {
    // jwt.verify(req.token,config.get('jwtsecret'),async(err,payload)=>{
    //     if(err)  
    //     {res.sendStatus(403)}
    //     else{
    //         const data=User.find();
    //         res.json(data)
    //     }
    // })
    User.findById(req.user.id)
        .select(['-password', '-confirmpassword'])
        .then(function (user) {
        res.json(user);
    });
});
module.exports = router;
