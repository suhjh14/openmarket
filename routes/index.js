'use strict';

var express = require('express');
var router = express.Router();
var MongoController = require('./../controller/MongoController');


var User = require('./../model/User');

/* GET home page. */
router.get('/', function (req, res, next) {


    //var tmp = {
    //    name: 'jihoon',
    //    age: 21,
    //    card: 'KB'
    //};
    //
    //var user = new User(tmp);
    //
    //user.info();
    //
    //MongoController.insertUser(user, function (err, result) {
    //
    //    res.send({result: err ? err : result});
    //
    //});

    /* check login status

     if not login user then redirect to login page
     else if login user and on-site user then show admin page
     else login user and third-party user then show marketing page

     */


    res.render('index', {title: 'Express'});


});


router.get('/user/:name', function(req, res) {

    var name = req.params.name;

    MongoController.findUser(name, function(err, result) {

        res.send({result: err ? err : result});

    });

});

module.exports = router;
