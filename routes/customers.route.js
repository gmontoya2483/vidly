const { Customer, validate } = require('../models/customers.model');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) {
        return res.status(404).send({message: "404 - Not found"});
    }
    res.send(customer);
});

router.post('/', async (req, res) => {
    const result = validate(req.body);
    if  (result.error) return res.status(400)
        .send({message: result.error.details[0].message.replace(/['"]+/g, "")});

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    await customer.save();
    res.send(customer);
});

router.put('/:id', async(req, res) => {
    //TODO: Refactor this method in order to get and keep the isGold value from the database in case it not part of the
    // parameters within the body

    const result = validate(req.body);
    if (result.error) return res.status(400)
        .send({message: (result.error.details[0].message).replace(/['"]+/g, "")});


    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            $set: { name: req.body.name,
                phone: req.body.phone,
                isGold: req.body.isGold}
                },{new: true});
    if (!customer) return res.status(404).send({message: "404 - Not found"});
    res.send(customer);
});


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send({message: "404 - Not found"});
    res.send(customer);
});

module.exports = router;
