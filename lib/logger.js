/**
 * module dependency.
 * if not set then env = dev
 */
var env = process.env.NODE_ENV || 'development'
    , config = require('../config/config')[env];

/**
 * require log4js
 */
var log4js = require('log4js');


/**
 * log4js configuration
 */
log4js.configure({
    appenders: [
        { type: 'console', category:'sorry' },
        { type: 'file', filename: 'logs/sorry.log', category: 'sorry' }
    ]
});

/**
 * get logger
 */
var logger = log4js.getLogger('sorry');
logger.setLevel(config.logger);

/**
 * module export.
 */
module.exports = logger;
