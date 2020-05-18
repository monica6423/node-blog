const express = require('express');
//const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const db = require('./config/key').MongoURI;
mongoose.connect(db, { useNewUrlParser: true });
const passport = require('passport');
require('./config/passport')(passport);

//EJS
const app = express();
app.locals.moment = require('moment');
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
// payload data, json file. axios send payload as json
app.use(express.json({ extended: false }));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());
//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', require('./routes/blog'));
app.use('/users', require('./routes/users'));
app.use('/', require('./routes/compose'));

////blog post

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function () {
  console.log('Server started on port 5000');
});
