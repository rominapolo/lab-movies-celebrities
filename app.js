
require('dotenv/config');
require('./db');

const express = require('express');
const hbs = require('hbs');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = 3000;

require('./config')(app);

const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();


app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

app.use(
  session({
    secret: '123secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000
    }, // ADDED code below !!!
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/expressApp'
    })
  })
);

app.use(function (req, res, next) {
  // im making a template variable called theUser and imequalling it to 
  // the user object in the session
  res.locals.theUser = req.session.currentlyLoggedIn;
  next();
})

// 👇 Start handling routes here
// const index = require('./routes/index');
// app.use('/', index);

const index = require('./routes/index');
app.use('/', index);

const Celebrities = require('./routes/celebrities');
app.use('/', Celebrities);

const Movies = require('./routes/movies');
app.use('/', Movies);

const User = require('./routes/authroutes');
app.use('/', User);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
