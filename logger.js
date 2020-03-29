const winston = require('winston');
require('winston-mongodb');

//TODO: Review thw format of the messages

module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log-file.log' }),
        new winston.transports.MongoDB({
            db: 'mongodb://localhost/vidly_log',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            level: 'error',
            collection: 'log'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'exceptions.log' }),
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
