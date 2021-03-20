const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const bcrypt = require('bcrypt');

const db = new sqlite3.Database("test.db");
const SALT_ROUNDS = 10;

let app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(favicon(__dirname + '/favicon.ico'));
app.use('/client_src', express.static(path.join(__dirname, '/client_src')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/client_src/index.html'));
});

app.post('/auth', function (request, response) {
    let email = request.body.email;
    let password = request.body.password;
    response.send(email);
    
    if (email && password) {
        let query = `SELECT email, name from users where email = ?`;
        let params = [email];
        let existingEmail = db.get(query, params, function(error, row) {

        })
        console.log(existingEmail)
/*         bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
            // Store hash in your password DB.
        }); */
        response.end();
    }   
});

app.post('/register', function (request, response) {

})

app.listen(8080);

db.close();