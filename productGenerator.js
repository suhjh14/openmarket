/**
 * Created by jihoon on 2016. 12. 15..
 */

var faker = require('Faker');
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;

var userName = 'ubuntu';
var password = 'openMarket123!';
var host = '127.0.0.1';
var port = '27017';
var dbName = 'openmarket';

var url = 'mongodb://'+host+':'+port+'/'+dbName;

//var url = 'mongodb://'+userName+':'+password+'@'+host+':'+port+'/'+dbName;


function productGenerator(callback){

    // 상품명, 가격, 이미지, 설명

    var result = [];

    fs.readFile('./product.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        for(var i = 0; i < data.length; i++) {
            var product = {};
            product._id = generateUUID();
            product.name = data[i].korean + data[i].name;
            product.price = Math.floor(Math.random() * 2000000) + 10000; // 10000 ~ 2000000 원 사이
            product.image = faker.Image.imageUrl();
            product.des = faker.Lorem.paragraphs();
            result.push(product);
        }


        callback(null, result);
    });

}


function generateUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


productGenerator(function(err, result) {
    if (err) {
        console.log(err);
    } else {
        //console.log(result);

        MongoClient.connect(url, function (err, db) {

            if (err) {

                console.error('[ERROR] : Connection fail');
                console.error(err);

            } else {

                console.log('Connection ok');

                var collection = db.collection('product');

                if (!collection) {

                    db.createCollection('product', function (err, collection) {

                        if (err) {
                            db.close();
                            console.error(err);
                        } else {

                            collection.insertMany(result, function (err, r) {

                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log('insert count : ', r.insertedCount);
                                }
                                db.close();
                            });
                        }
                    });

                } else {

                    collection.insertMany(result, function (err, r) {

                        if (err) {
                            console.error(err);
                        } else {
                            console.log('insert count : ', r.insertedCount);
                        }
                        db.close();
                    });
                }

            }
        });


    }
});



module.exports = {
    productGenerator: productGenerator
};