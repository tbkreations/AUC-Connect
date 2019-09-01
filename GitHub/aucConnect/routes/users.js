const express = require('express')
const router = express.Router();

//Register Page
router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/register', (req, res) => {
    const {email} = req.body;
    let errors = []

    let acceptable = ["morehouse.edu", "spelman.edu", "cau.edu"]; 
    //Domain Check For Email
    if (email.split('@')[1] === acceptable[0]) {
        // window.alert('You Go to Morehouse');
        console.log('morehouse');
    } else if (email.split('@')[1] === acceptable[1]) {
        // window.alert('You Go to Spelman');
        console.log('spelman');
    } else if (email.split('@')[1] === acceptable[2]) {
        // window.alert('You Go to CAU');
        console.log('cau');
    } else {
        // window.alert('Must be an AUC Student to Register');
        console.log("Not AUC");
    }
})

module.exports = router