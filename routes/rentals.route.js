const { Movie } = require('../models/movies.model');
const { Customer } = require('../models/customers.model');
const { Rental, validate } = require('../models/rentals.model');

const mongoose = require('mongoose');
const Fawn = require('fawn');

const express = require('express');
const router = express.Router();

// Init fawn for using transactions
Fawn.init(mongoose);


router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if  (result.error) return res.status(400)
        .send({message: result.error.details[0].message.replace(/['"]+/g, "")});

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send({message: "Invalid customer."});


    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send({message: "Invalid movie."});

    //Validate Movie Stock
    if(movie.numberInStock === 0) return res.status(400)
        .send({message: `Movie ${ movie.title }, is not in stock.`});

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        new Fawn.Task()
            .save('rentals', rental) // 'rentals'Collection name in MongoDB
            .update('movies', {_id: movie._id}, {
                $inc: {numberInStock: -1}
            }).run();

        res.send(rental);
    } catch (e) {
        res.status(500).send({message: `Internal Server Error.`});
    }

});


module.exports = router;
