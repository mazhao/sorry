
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

    // login and set session user
    req.session.user = { nick: id };

    res.render('index', { title: title, user: req.session.user });
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

    var nick = req.body.nick;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
    var description = req.body.description;

    console.log("nick:" + nick + " email:" + email + " phone:" + phone + " password:" + password + " desc:" + description);

    res.redirect('/');
}