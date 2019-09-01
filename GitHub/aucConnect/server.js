const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//Body Parser
app.use(express.urlencoded({
    extended: false
}));

// Express Session
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);