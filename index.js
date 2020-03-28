const error = require('./middleware/error.middleware');
const config = require('config');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres.route');
const customers = require('./routes/customers.route');
const movies = require('./routes/movies.route');
const rentals = require('./routes/rentals.route');
const users = require('./routes/users.route');
const auth = require('./routes/auth.route');
const express = require('express');
const app = express();

//Verify if the jwtPrivateKey envVariable exists
if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


//Connection to mongoDB
mongoose.connect('mongodb://localhost/vidly',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )
    .then (() => {
        mongoose.set('useFindAndModify', false);
        console.log('Connected to MongoDB...');})
    .catch(err => console.error('Could not connect to MongoDB', err));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening por ${port} .....`);
});







