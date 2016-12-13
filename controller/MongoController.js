/**
 * Created by jihoon on 2016. 11. 5..
 */

var MongoClient = require('mongodb').MongoClient;

var userName = 'ubuntu';
var password = 'openMarket123!';
var host = '52.187.37.208';
var port = '27017';
var dbName = 'openmarket';

var url = 'mongodb://'+host+':'+port+'/'+dbName;

function connection(callback) {

    MongoClient.connect(url, function (err, db) {

        if (err) {

            console.error(err);
            callback(err);

        } else {

            console.log('Connection ok');
            callback(null, db);
        }
    });
}


//todo move to UserController

function insertUser(user, callback) {

    console.log('user : ', user);

    connection(function (err, db) {
        if (!err) {

            var collection = db.collection('users');

            if (!collection) {

                db.createCollection('users', function (err, collection) {

                    if (err) {
                        db.close();
                        console.error(err);
                        callback(err);
                    } else {

                        collection.insertOne(user, function (err, result) {
                            db.close();
                            if (err) {
                                console.error(err);
                                callback(err);
                            } else {
                                console.log(result);
                            }
                            callback(null, result);
                        });
                    }
                });
            } else {

                collection.insertOne(user, function (err, result) {
                    db.close();
                    if (err) {
                        console.error(err);
                        callback(err);
                    } else {
                        console.log(result);
                    }
                    callback(null, result);
                });
            }

        } else {

            callback(err);
        }
    });

}

function findUser(name, callback) {

    console.log('name : ', name);

    connection(function (err, db) {
        if (!err) {

            var collection = db.collection('users');

            if (!collection) {
                var error = new Error('users collection is empty');
                db.close();
                callback(error);
            } else {
                collection.findOne({name: name}, function (err, result) {
                    db.close();
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, result);
                    }

                });
            }
        }
    });
}

module.exports = {
    connection: connection,
    insertUser: insertUser,
    findUser: findUser
};
