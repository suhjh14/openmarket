var express = require('express');
var router = express.Router();
var MongoController = require('./../controller/MongoController');


var User = require('./../model/User');

/* GET home page. */
router.get('/', function (req, res, next) {


    var tmp = {
        name: 'jihoon',
        age: 21,
        card: 'KB'
    };

    var user = new User(tmp);

    user.info();

    MongoController.insertUser(user, function (err, result) {

        res.send({result: err ? err : result});

    });

});

module.exports = router;
