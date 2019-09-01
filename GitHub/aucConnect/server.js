const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');

const indexRouter = require('./routes/index');

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

//Routes
app.use('/', indexRouter);
app.use('/users', require('./routes/users'));

app.post('/users/register', (req, res) => {
    
})

app.listen(process.env.PORT || 3000);