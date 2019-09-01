const express = require('express')
const router = express.Router();

//Register Page
router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

//Register Handle
router.post('/register', (req, res) => {
    console.log(req.body);
    const { email } = req.body
    let errors = [];

})

module.exports = router