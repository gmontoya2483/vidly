const express = require('express');
const router = express.Router();


const genres = [
    {id:1, genre: 'Action'},
    {id:2, genre: 'Comedy'},
];


router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(genreItem => genreItem.id === parseInt(req.params.id));
    if(!genre) {
        return res.status(404).send({message: "404 - Not found"});
    }

    res.send(genre);
});

router.post('/', (req, res) => {
    const result = validateGenre(req.body);
    if  (result.error) return res.status(400).send({error: result.error.details[0].message});

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    };

    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(genreItem => genreItem.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send({message: "404 - Not found"});

    const result = validateGenre(req.body);
    if (result.error) return res.status(400).send({error: result.error.details[0].message});

    genre.genre = req.body.genre;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(genreItem => genreItem.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send({message: "404 - Not found"});

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validateGenre(genre) {
    const schema = Joi.object({
        genre: Joi.string()
            .min(3)
            .required()
    });
    return schema.validate(genre);
}


module.exports = router;
