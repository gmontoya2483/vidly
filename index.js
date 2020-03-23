const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres.route');
const customers = require('./routes/customers.route');
const movies = require('./routes/movies.route');
const rentals = require('./routes/rentals.route');
const express = require('express');
const app = express();

//Connection to mongoDB
mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true, useUnifiedTopology: true } )
    .then (() => {
        mongoose.set('useFindAndModify', false);
        console.log('Connected to MongoDB...');})
    .catch(err => console.error('Could not connect to MongoDB', err));



app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);



//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening por ${port} .....`);
});







