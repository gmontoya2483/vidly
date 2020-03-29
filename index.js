require('express-async-errors');
const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('./startup/routes.startup')(app);


//Verify if the jwtPrivateKey envVariable exists
if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    throw new Error('jwtPrivateKey is not defined.');
}

//Connection to mongoDB
mongoose.connect('mongodb://localhost/vidly',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
    .then (() => {
        mongoose.set('useFindAndModify', false);
        console.log('Connected to MongoDB...');})
    .catch(err => console.error('Could not connect to MongoDB', err));


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening por ${port} .....`);
});







