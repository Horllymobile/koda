const express = require('express');
const User = require('../models/Users');
const validateRegisterUser = require('./../validations/register');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');

// Login Route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureFlash: true,
        successFlash: true,
        successMessage: 'Logged in Successfully',
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureMessage: res.locals.error_msg
    })(req, res, next);
});


// Register Route

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async(req, res) => {

    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const error = validateRegisterUser(user);
    if(error){
        console.log(error)
        return res.render('register', { error: error.error.details[0].message });
    }
    else if (user.password !== req.body.password2){
        return res.render('register', { error: 'Password did not match'});
    }
    let tem = await User.findOne({email: user.email});

    if(tem) return res.render('register', { error: 'User with the email already exist'});


    let newUser = new User({
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10,'a'))
    });

    const save = await newUser.save();
    
    if (save)  {
        req.flash('success_msg', 'You have been successfully registered, you can now login');
        res.redirect('/users/login');
    };
});



module.exports = router;