/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    security = require('../lib/security'),
    logger = require('../lib/logger');

logger.debug('model user:' + User);

/*
 * GET users listing.
 */

var title = "纠结乎~";

exports.list = function(req, res){
  res.send("respond with a resource");
};


/**
 *
 * @param req
 * @param res
 */
exports.gotologin = function(req, res) {
    res.render('user/login.ejs', { title: title + " - 登陆"});

};

/**
 * post to login
 * @param req
 * @param res
 */
exports.login = function(req, res) {
    var id = req.body.userid;
    var pwd = req.body.userpassword;

    User.find({$or: [{email:id}, {phone: id}]}).exec(function(err, users) {
        if(err) {
            logger.debug("find user error");
            res.render('user/login', {title: title, errormsg: " %>_<% 服务器登陆错误，稍后请重新尝试！"});

        } else {
            logger.debug('find user:' + users[0]);
            var hashedPassword = security.encryptPassword(pwd, users[0].salt);
            logger.debug("generated password:" + hashedPassword);
            logger.debug("stored    password:" + users[0].hashed_password);
            if( hashedPassword == users[0].hashed_password ) {
                logger.debug("login success:" + users[0].nick);
                // login and set session user
                req.session.user = {
                    nick: users[0].nick,
                    email: users[0].email,
                    phone: users[0].phone,
                    description: users[0].description
                };
                res.render('index', { title: title });
            } else {
                logger.debug("login failed, password no match");
                res.render('user/login', {title: title, errormsg: "用户名或密码不正确，请重新尝试！"});
            }


        }

    });



};


/**
 * 跳转到登陆页面
 * @param req
 * @param res
 */
exports.gotosignup = function(req, res) {
    res.render('user/signup.ejs', {title: title + " - 注册"});
}


/**
 * 用户登出。
 * @param req
 * @param res
 */
exports.logout = function(req, res) {
    // 删除登陆session中的数据，返回首页。
    delete req.session.user;
    res.redirect('/');
}


exports.signup = function(req, res) {

    // for debug only
    // @TODO using log4js to replace it later.

    logger.debug("hello log4js");

    var nick = req.body.nick;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
    var description = req.body.description;

    logger.debug("nick:" + nick + " email:" + email + " phone:" + phone + " password:" + password + " desc:" + description);


    var user = new User(req.body);
    logger.debug("model user:" + user);
    user.provider = 'local';
    user.save(function(err){

        if(err) {
            // resend to signup page with error details
            logger.debug('sign up error:' + err);

            var errormsg = {
                formIds: [],
                formErrors: []
            };

            Object.keys(err.errors).forEach(function (key) {
                logger.debug("error key:" + key);
                logger.debug("error val:" + err.errors[key]);
                errormsg.formIds.push(key);
                errormsg.formErrors.push(err.errors[key]);
            });

            res.render('user/signup.ejs', {
                title: title + " - 注册 信息错误" ,
                errormsg: errormsg ,
                user: user
            });

        } else {
            logger.debug('sign up success, find it with mongohub pls.');
            req.session.user = {
                nick: user.nick ,
                email: user.email ,
                phone: user.phone ,
                description: user.description
            };
            res.render('index', { title: title });
        }
    });



}