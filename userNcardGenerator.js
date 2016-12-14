/**
 * Created by jihoon on 2016. 12. 15..
 */

var MongoClient = require('mongodb').MongoClient;


var url = 'mongodb://mongomongo:sgKl77UrrsF8K6thfOXHQr5m0mpfen8QQUUa8q4HRA5iKH7G2rkAuksjKKWX1BnHsRzAYo2LlefAHWdyZe1K4A==@mongomongo.documents.azure.com:10250/?ssl=true';


function generateUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};
function randomString(len) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = len;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }

    return randomstring;
};
function randomNumber(len){
    var tmp = Math.pow(10,len-1);

    return(Math.floor(Math.random()*9*tmp)+tmp).toString();
};
function rangeNumber(start, end){
    return (Math.floor(Math.random()*(end-start)+start)).toString();
};

MongoClient.connect(url, function (err, db) {

    var users = db.collection('user');

    var cards = db.collection('card');


                var day = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
                var bank = ["국민", "우리", "신한", "하나", "SC제일", "한국씨티", "농협", "기업", "산업", "수협"];
                var bankCnt = bank.length;
                var email = ["@naver.com", "@daum.net", "@gmail.com", "@yahoo.com"];
                var emailCnt = email.length;
                var sex = ["male", "female"];
                var sexCnt = sex.length;

                for (var i = 0; i < 1000; i++) {
                    var sexType = Math.floor(Math.random() * sexCnt);
                    var uuid = generateUUID();
                    var productUUID = generateUUID();
                    var cardNumber = randomNumber(4) + '-' + randomNumber(4) + '-' + randomNumber(4) + '-' + randomNumber(4);
                    var tel = "010-" + randomNumber(4) + '-' + randomNumber(4);
                    var jumin = rangeNumber(50, 99) + (day[Math.floor(Math.random() * 12)]).toString() + (day[Math.floor(Math.random() * 30)]).toString() + '-' + (sexType + 1) + randomNumber(6);

                    cards.insertOne({
                        "_id": uuid,
                        "cardCompany": bank[Math.floor(Math.random() * bankCnt)],
                        "cardNumber": cardNumber,
                        "cvc": randomNumber(3)
                    });
                    users.insertOne({
                        "_id": uuid,
                        "ID": randomString(7),
                        "password": randomString(8),
                        "email": randomString(7) + email[Math.floor(Math.random() * emailCnt)],
                        "sex": sex[sexType],
                        "tel": tel,
                        "adr": randomNumber(5),
                        "jumin": jumin
                    });
                }

                console.log("ok");


});
