/**
 * Module Dependencies
 */

var crypto = require('crypto');


/**
 * encrypt password.
 * @param password
 * @param salt
 * @returns {*}
 */
exports.encryptPassword = function (password, salt) {

    var encrypted;

    // get digest
    if (!password) {
        encrypted = '';
    } else {
        try {
            encrypted = crypto.createHmac('sha1', salt).update(password).digest('hex');
        } catch (err) {
            consoel.log("error:" + err);
            encrypted = '';
        }
    }
    // return
    return encrypted;
};