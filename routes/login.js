/**
 * Created by jihoon on 16. 12. 14.
 */
'use strict';

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var MongoController = require('./../controller/MongoController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login', {title: 'LogIn'});
});


router.post('/signup', function (req, res, next) {

    var email = req.body.email;
    var name = req.body.name;
    var password = getSecurityPassword(email, req.body.password);

    var user = {
        name: name,
        email: email,
        password: password
    };

    MongoController.insertUser(user, function(err, result) {

        if (err) {
            return res.json({error: err});
        }

        // todo redirection to 카드 정보 보여주는 페이지
        res.send(result);
    });


});

router.post('/login', function (req, res, next) {

    var email = req.body.email;
    var password = getSecurityPassword(email, req.body.password);

    MongoController.findUserByEmailAndPass(email, password, function (err, result) {

        if (err) {
            return res.json({error: err});
        }

        // todo redirection to 카드 정보 보여주는 페이지
        res.send(result);

    });
});



function getSecurityPassword(email, password) {
    var hmac = crypto.createHmac('sha256', email + 'openMarket');
    var tmp = password + 'openMarket';
    return hmac.update(tmp).digest('hex');
}


module.exports = router;
