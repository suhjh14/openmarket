'use strict';
var express = require('express');
var router = express.Router();
var MongoController = require('./../controller/MongoController');

/* GET users listing. */
router.get('/', function(req, res, next) {

    // todo fetch User Data

    MongoController.findAllUser();

  res.send('user information default page');
});

router.get('/purchase', function (req, res, next) {

    // todo fetch All Data

    MongoController.findAllPurchase();

  res.send('user & card information page');
});

router.get('/thirdpart', function (req, res, next) {

    // todo fetch Encrypt Data

    MongoController.findEncryptData();  // k-익명성 데이터

  res.send('encrypt data page');
});

module.exports = router;
