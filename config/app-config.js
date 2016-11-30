/* globals process module */

const express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(session({ secret: 'idiocracy' }));

app.set('view engine', 'pug');

app.use('/static', express.static('public'));


module.exports = app;