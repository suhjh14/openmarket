'use strict';

var express = require('express');
var router = express.Router();
var MongoController = require('./../controller/MongoController');


var User = require('./../model/User');

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('index', {title: 'Express'});


});


router.get('/test', function(req, res) {


    MongoController.findAllUser(function(err, result) {

        res.send({result: err ? err : result});

    });

});

module.exports = router;
