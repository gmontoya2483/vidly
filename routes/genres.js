const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//Genre Model Class
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));





router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) {
        return res.status(404).send({message: "404 - Not found"});
    }
    res.send(genre);
});

router.post('/', async (req, res) => {
    const result = validateGenre(req.body);
    if  (result.error) return res.status(400)
        .send({message: result.error.details[0].message.replace(/['"]+/g, "")});

    let genre = new Genre({name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async(req, res) => {
    const result = validateGenre(req.body);
    if (result.error) return res.status(400)
        .send({message: (result.error.details[0].message).replace(/['"]+/g, "")});

    const genre = await Genre.findByIdAndUpdate(req.params.id, {$set: {name: req.body.name}},{new: true});
    if (!genre) return res.status(404).send({message: "404 - Not found"});

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send({message: "404 - Not found"});
    res.send(genre);
});

function validateGenre(genre) {
    const schema = Joi.object().keys({
        name: Joi.string()
            .min(5)
            .max(55)
            .required()
    });
    return schema.validate(genre);
}


module.exports = router;
