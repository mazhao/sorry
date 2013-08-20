/**
 * module dependencies
 */
var logger = require('../lib/logger');


/*
 * GET home page.
 */

var title = "纠结乎~";

exports.index = function(req, res){

    logger.debug('begin index');

    res.render('index', { title: title });
};



