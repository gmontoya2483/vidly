const error = require('../middleware/error.middleware');
const express = require('express');
const genres = require('../routes/genres.route');
const customers = require('../routes/customers.route');
const movies = require('../routes/movies.route');
const rentals = require('../routes/rentals.route');
const users = require('../routes/users.route');
const auth = require('../routes/auth.route');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
};
