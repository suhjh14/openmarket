/**
 * Created by jihoon on 2016. 11. 5..
 */

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://wearhouse-mongo:qZbfqhf0F51WwX35Z9pJvVOxwppUfmz3QKX0KEiJ2XyT0y9Ol4rzXEHs1IucckiNUCUR6ESpW6jptGeVh2eGHg==@wearhouse-mongo.documents.azure.com:10250/?ssl=true';


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

module.exports = {
    connection: connection
};
