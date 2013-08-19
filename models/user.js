/**
 * Module dependencies
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema      /* data schema */
    , security = require('../lib/security');   /* hash with password */


/**
 * User Schema
 */

var UserSchema = new Schema({
    nick: {type: String, default: ''}, /* user nick */
    email: {type: String, default: ''}, /* user email */
    phone: {type: String, default: ''}, /* user cell phone number */
    description: {type: String, default: ''}, /* user description */
    hashed_password: {type: String, default: ''}, /* hashed password */
    salt: {type: String, default: ''}            /* hash salt */
});

/**
 * schema methods
 */

UserSchema.methods = {

    /**
     * password -> hashed password
     * @param password plain password
     * @returns {*} hashed password
     */
    encryptPassword: function (password) {
        return security.encryptPassword(password, this.salt);
    },

    /**
     * make salt for password hashing
     * @returns {string}
     */
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },

    /**
     * check password identity
     * @param plainPassword plain password
     * @returns {boolean} true for equal, false else.
     */
    authenticate: function (plainPassword) {
        return this.encryptPassword(plainPassword) === this.hashed_password;
    },

    /**
     * check if value exists and length longer than 0
     * @param value value to be checked
     * @returns {*}
     */
    validatePresenceOf: function (value) {
        return value && value.length;
    }

};

/**
 * Virtual properties
 */

UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    }
);


/**
 * Validators
 */

// for nick
UserSchema.path('nick').validate(function (nick) {
    return nick.length;
}, '昵称不能为空！');

UserSchema.path('nick').validate(function (nick, fn) {
    var User = mongoose.model('User');
    if (this.isNew || this.isModified('nick')) {
        User.find({nick: nick}).exec(function (err, users) {
            fn(err || users.length == 0);
            // fn(false) means system error or already exists.
            // fn(true) means user not exist, can save or modify.
        });
    } else {
        fn(true);
    }
}, '昵称已经存在！');

// for email

UserSchema.path('email').validate(function (email) {
    return email.length;
}, '邮件地址不能为空！');

UserSchema.path('email').validate(function (email, fn) {
    var User = mongoose.model('User');

    if (this.isNew || this.isModified('email')) {
        User.find({email: email }).exec(function (err, users) {
            fn(err || users.length === 0); // fn(false) means validation failed (exists)
        });
    } else {
        fn(true);
    }

}, '邮件地址已经存在，请重新确认！');

// for phone

UserSchema.path('phone').validate(function (phone) {
    return phone.length;
}, '手机号码不能为空！');

UserSchema.path('phone').validate(function (phone, fn) {
    var User = mongoose.model('User');

    if (this.isNew || this.isModified('phone')) {
        User.find({phone: phone}).exec(function (err, users) {
            fn(err || users.length === 0)
        });
    } else {
        fn(ture);
    }
}, '手机号码已存在！');

// for description

UserSchema.path('description').validate(function(description){
    return description.length;
}, '个人描述不能为空！');

// for hashed password
UserSchema.path('hashed_password').validate(function(hashedPassword){

    return hashedPassword.length ;

}, '密码不能为空！');


/**
 * Pre-Save Hook
 */

UserSchema.pre('save', function(next){
    if(!this.isNew) {  // if not new then next
        return next();
    }

    if(!this.validatePresenceOf(this.password)) {
        next(new Error('密码不存在！'))
    } else {
        next();
    }
});


/**
 * Set Model Name form User Schema
 */
mongoose.model('User', UserSchema);

