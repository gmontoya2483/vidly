require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

//TODO: Review thw format of the messages


module.exports = winston.createLogger({
    format: winston.format.combine(
        //winston.format.label({ label: 'right meow!' }),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.colorize()
    ),

    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log.log' }),
        new winston.transports.MongoDB({
            db: 'mongodb://localhost/vidly_log',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            level: 'info',
            collection: 'log'
        })
    ],
    exceptionHandlers: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log_exceptions.log' }),
        new winston.transports.MongoDB({
            db: 'mongodb://localhost/vidly_log',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            level: 'error',
            collection: 'exception'
        })
    ]
});
