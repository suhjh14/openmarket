var express = require('express');
var router = express.Router();
var MongoDB = require('./../controller/MongoController');
/* GET home page. */
router.get('/', function (req, res, next) {

    MongoDB.connection(function (err, db) {

        if (err) {

            res.send({result: 'connection error : ' + err});

        } else {

            db.createCollection('test', function(err, collection) {

                if (err) {

                    return res.send({result: 'create collection error : ' + err});

                }

                res.render('index', {title: 'Express'});

           });

        }

    });


});

module.exports = router;
