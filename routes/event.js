/**
 * module dependencies
 */
var logger = require('../lib/logger');


/*
 * GET home page.
 */

var title = "纠结乎~ 我来说两句！";

exports.gotoadd = function(req, res){

    logger.debug('goto event add');

    res.render('event/add', { title: title });
};
