const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/users.model');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if  (result.error) return res.status(400)
        .send({message: result.error.details[0].message.replace(/['"]+/g, "")});

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400)
        .send({message: `email '${req.body.email}' already registered`});

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    // Generate the token to be sent in the header
    const token = await jwt.sign({_id: user._id},  config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(_.pick(user,['_id', 'name', 'email']));

});

module.exports = router;
