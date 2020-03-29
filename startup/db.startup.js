const logger = require('./logger.startup');
const mongoose = require('mongoose');


module.exports = function(){
    //Connection to mongoDB
    mongoose.connect('mongodb://localhost/vidly',
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
        .then (() => {
            mongoose.set('useFindAndModify', false);
            logger.info('Connected to MongoDB...');
        })
        .catch(err => console.error('Could not connect to MongoDB', err));
};
