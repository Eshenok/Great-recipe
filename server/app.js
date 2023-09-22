/*imports*/
const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const centralErrorHandling = require('./errors/centralErrorHandling');
/*env*/
require('dotenv').config();
const { PORT = 2020, CONNECT_DB, NODE_ENV, SESSION_SECRET } = process.env; // Забираем из .env

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? CONNECT_DB : 'mongodb://localhost:27017/recipedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  session({
    secret: NODE_ENV==='production' ? SESSION_SECRET : 'secret key', // secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/recipedb' }), //session storage in MongoDB
    cookie: {
      maxAge: 5 * 60 * 60 * 1000, // (5 hours)
      secure: false, // http
    },
  })
);

app.use('/', require('./routes/index'));

app.use(centralErrorHandling);

app.listen(PORT);
