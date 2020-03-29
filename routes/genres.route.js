const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const { Genre, validate} = require('../models/genres.model');
const express = require('express');
const router = express.Router();


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

router.post('/', auth, async (req, res) => {

    const result = validate(req.body);
    if  (result.error) return res.status(400)
        .send({message: result.error.details[0].message.replace(/['"]+/g, "")});

    const genre = new Genre({name: req.body.name});
    await genre.save();
    res.send(genre);
});

router.put('/:id', auth,async(req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400)
        .send({message: (result.error.details[0].message).replace(/['"]+/g, "")});

    const genre = await Genre.findByIdAndUpdate(req.params.id, {$set: {name: req.body.name}},{new: true});
    if (!genre) return res.status(404).send({message: "404 - Not found"});

    res.send(genre);
});

router.delete('/:id', [auth, admin],async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send({message: "404 - Not found"});
    res.send(genre);
});

module.exports = router;
