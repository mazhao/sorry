
/*
 * GET users listing.
 */

var title = "纠结乎~";

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.gotologin = function(req, res) {
    res.render('user/login.ejs', { title: title + " - 登陆"});

};

exports.login = function(req, res) {
    var id = req.body.userid;
    var pwd = req.body.userpassword;

    // login and set session user
    req.session.nick=  id ;
    console.log("id:" + id + " pwd:" + pwd);

    res.render('index', { title: title, nick: req.session.nick });
};


exports.gotosignup = function(req, res) {
    res.render('user/signup.ejs', {title: title + " - 注册"});
}