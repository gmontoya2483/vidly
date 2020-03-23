const { Movie, validate } = require('../models/movies.model');
const { Genre } = require('../models/genres.model');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});


router.post('/', async (req, res) => {
    const result = validate(req.body);
    if  (result.error) return res.status(400)
        .send({message: result.error.details[0].message.replace(/['"]+/g, "")});

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send({message: "Invalid genre."});

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
});

router.get('/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) {
        return res.status(404).send({message: "404 - Not found"});
    }
    res.send(movie);
});

router.put('/:id', async(req, res) => {
    //TODO: Refactor this method in order to get and keep the isGold value from the database in case it not part of the
    // parameters within the body

    const result = validate(req.body);
    if (result.error) return res.status(400)
        .send({message: (result.error.details[0].message).replace(/['"]+/g, "")});

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send({message: "Invalid genre."});



    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            $set: {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            }
        },{new: true});
    if (!movie) return res.status(404).send({message: "404 - Not found"});
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send({message: "404 - Not found"});
    res.send(movie);
});


module.exports = router;
