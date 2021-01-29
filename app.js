const express = require('express');
const app = express ();
const path = require('path');
const morgan = require('morgan');
const basicRoutes = require('./routes/basicRoutes');

app.use(express.static(path.join(__dirname, "public")));

app.set('view engine', 'ejs');

app.set("views" , path.join(__dirname, "views"));

app.use(morgan("dev"));

app.use('/', basicRoutes);

module.exports = app;

