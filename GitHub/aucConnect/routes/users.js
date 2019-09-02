const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const {
    ensureAuthenticated
} = require('../config/auth');

//Register Page
router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user
    })
})

router.post('/register', (req, res) => {
    const {
        email,
        password,
        confirmPassword
    } = req.body;
    let errors = []

    let acceptable = ["morehouse.edu", "spelman.edu", "cau.edu"];
    let school = 'unknown';
    let firstname = 'unknown';
    let lastname = 'unknown';

    //Domain Check For Email
    if (email.split('@')[1] === acceptable[0]) {
        school = 'Morehouse'
        //Get Student Name
        firstname = email.split('.')[0];
        lastname = email.split('.')[1].split('@')[0];
        firstname = firstname.charAt(0).toUpperCase() + firstname.substring(1);
        lastname = lastname.charAt(0).toUpperCase() + lastname.substring(1);
    } else if (email.split('@')[1] === acceptable[1]) {
        school = 'Spelman'
        //Get Student Name
        firstname = email.split('.')[0];
        lastname = email.split('.')[1].split('@')[0];
        firstname = firstname.charAt(0).toUpperCase() + firstname.substring(1);
        lastname = lastname.charAt(0).toUpperCase() + lastname.substring(1);
    } else if (email.split('@')[1] === acceptable[2]) {
        school = 'CAU'
        //Get Student Name
        firstname = email.split('.')[0];
        lastname = email.split('.')[1].split('@')[0];
        firstname = firstname.charAt(0).toUpperCase() + firstname.substring(1);
        lastname = lastname.charAt(0).toUpperCase() + lastname.substring(1);
    } else {
        console.log("Not AUC");
        errors.push({
            msg: "Please use your school email address"
        });
    }

    //Check pass length
    if (password.length < 6) {
        errors.push({
            msg: "Password Must Be At Least 6 Characters"
        });
    }

    //Check passwords match
    if (password != confirmPassword) {
        errors.push({
            msg: "Passwords do not Match"
        });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            email,
            password,
            confirmPassword
        });
    } else {
        //validated
        User.findOne({
                email: email
            })
            .then(user => {
                if (user) {
                    // User exists
                    errors.push({
                        msg: 'Email is Already Registered'
                    });
                    res.render('register', {
                        errors,
                        email,
                        password,
                        confirmPassword
                    });
                } else {
                    const newUser = new User({
                        firstname,
                        lastname,
                        email,
                        password,
                        school
                    });

                    console.log(newUser);

                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'An E-Mail Will Be Sent to ' + email + ' to confirm your registration');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }))
                }
            })
    }
});

//Login Route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Logout Success');
    res.redirect('/users/login')
})

module.exports = router