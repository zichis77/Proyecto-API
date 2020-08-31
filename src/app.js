const express = require("express");
const app = express();
const morgan = require('morgan');
const router = require("./routes/index.js");

app.use(morgan('dev'));

app.use(require('./routes/index.js'));

module.exports = app;