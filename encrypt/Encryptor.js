/**
 * Created by jihoon on 2016. 12. 14..
 */
'use strict';

var crypto = require('crypto');
var encryptKey = 'openmarket';



function getEncryptData(data) {


    var cipher = crypto.createCipher('aes256', encryptKey);
    cipher.update(data, 'utf8', 'hex');

    return cipher.final('hex');

} // 암호화


function getDecryptData(data) {

    var decipher = crypto.createDecipher('aes256', encryptKey);
    decipher.update(data, 'hex', 'utf8');

    return decipher.final('utf8');
} // 복호화


module.exports = {
    getEncryptData: getEncryptData,
    getDecryptData: getDecryptData
};