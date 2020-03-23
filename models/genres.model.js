const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

//Genre Model Class
const Genre = mongoose.model('Genre', genreSchema);


function validateGenre(genre) {
    const schema = Joi.object().keys({
        name: Joi.string()
            .min(5)
            .max(55)
            .required()
    });
    return schema.validate(genre);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema = genreSchema;
