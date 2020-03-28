const auth = require('../middleware/auth.middleware');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/users.model');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select({password: 0});
    if(!user) {
        return res.status(404).send({message: "404 - Not found"});
    }
    res.send(user);
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if  (result.error) return res.status(400)
        .send({message: result.error.details[0].message.replace(/['"]+/g, "")});

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400)
        .send({message: `email '${req.body.email}' already registered`});

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    // Generate the token to be sent in the header
    const token = await user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user,['_id', 'name', 'email', 'isAdmin']));

});

module.exports = router;
