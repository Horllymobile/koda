const express = require('express');
const User = require('../models/Users');

const router = express.Router();


router.get('/users', async(req, res) => {
    res.send(await User.find());
})

router.get('/home', (req, res) => {
    res.render('index');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})


module.exports = router;