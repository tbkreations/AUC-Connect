const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');
const passport = require('passport')
const flash = require('connect-flash');
const session = require('express-session');

const indexRouter = require('./routes/index');

//Passpport Config
require("./config/passport.js")(passport);

//DB Config
let db;
if (fs.existsSync(__dirname + '/config')) {
    console.log("Mongo Setup: DBCONF");
    db = require('./config/keys').MongoURI;
} else {
    console.log("Mongo Setup: DBENV");
    db = process.env.DATABASE_URL;
};

const mongoose = require('mongoose');
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('Mongo DB Connected...'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

//Globals
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', indexRouter);
app.use('/users', require('./routes/users'));

app.post('/users/register', (req, res) => {

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on Port ${PORT}...`));