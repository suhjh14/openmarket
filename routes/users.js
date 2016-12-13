'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user information default page');
});

router.get('/card', function (req, res, next) {
  res.send('user & card information page');
});

router.get('/thirdpart', function (req, res, next) {
  res.send('encrypt data page');
});

module.exports = router;
