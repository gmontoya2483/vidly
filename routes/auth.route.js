const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/users.model');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if  (result.error) return res.status(400)
        .send({message: result.error.details[0].message.replace(/['"]+/g, "")});

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400)
        .send({message: `Invalid email or Password.`});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400)
        .send({message: `Invalid email or Password.`});

    const token = await user.generateAuthToken();
    res.send({token: token});

});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().required()
    });
    return schema.validate(req);
}

module.exports = router;
