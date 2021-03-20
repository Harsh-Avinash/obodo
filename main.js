const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
var sgTransport = require('nodemailer-sendgrid-transport');

const db = new sqlite3.Database("test.db");

let app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/auth', function (request, response) {
    let email = request.body.email;
    if (email) {
        const otp = Math.random(
        /* send mail */
    }   
});

app.listen(8080);

db.close();