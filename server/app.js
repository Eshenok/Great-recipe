/*imports*/
const express = require('express');
const mongoose = require('mongoose');
/*env*/
require('dotenv').config();
const { PORT = 2020, CONNECT_DB, NODE_ENV } = process.env; // Забираем из .env

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? CONNECT_DB : 'mongodb://localhost:27017/recipedb');

app.use('/', require('./routes/index'));

app.listen(PORT);
