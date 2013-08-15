
/*
 * GET home page.
 */

var title = "纠结乎~";

exports.index = function(req, res){
  res.render('index', { title: title, nick: req.session.nick });
};



