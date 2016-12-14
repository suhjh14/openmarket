/**
 * Created by jihoon on 2016. 11. 5..
 */

var MongoClient = require('mongodb').MongoClient;

var userName = 'ubuntu';
var password = 'openMarket123!';
var host = '52.187.37.208';
var port = '27017';
var dbName = 'openmarket';

var url = 'mongodb://mongomongo:sgKl77UrrsF8K6thfOXHQr5m0mpfen8QQUUa8q4HRA5iKH7G2rkAuksjKKWX1BnHsRzAYo2LlefAHWdyZe1K4A==@mongomongo.documents.azure.com:10250/?ssl=true';

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

            var collection = db.collection('user');

            if (!collection) {

                db.createCollection('user', function (err, collection) {

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

            var collection = db.collection('user');

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

function findUserByEmailAndPass(email, password, callback) {

    connection(function (err, db) {
        if (!err) {

            var collection = db.collection('user');

            if (!collection) {
                var error = new Error('users collection is empty');
                db.close();
                callback(error);
            } else {
                collection.findOne({email: email, password: password}, function (err, result) {
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

function findAllUser(callback) {
    connection(function (err, db) {
        if (!err) {

            var collection = db.collection('user');

            if (!collection) {
                var error = new Error('users collection is empty');
                db.close();
                callback(error);
            } else {
                collection.find({},{_id:0}).toArray(function (err, result) {
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

function findAllPurchase() {

}

function findEncryptData() {

}

module.exports = {
    connection: connection,
    insertUser: insertUser,
    findUser: findUser,
    findUserByEmailAndPass: findUserByEmailAndPass,
    findAllUser: findAllUser,
    findAllPurchase: findAllPurchase,
    findEncryptData: findEncryptData
};
