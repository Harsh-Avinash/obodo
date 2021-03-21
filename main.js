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
    response.send(`Attempting to log you in as ${email}...`);
    
    if (email && password) {
        let query = `SELECT email, name from users where email = ?`;
        let params = [email];
        let existingEmail = db.get(query, params, function(error, row) {
            if (!error) {
                response.send('Found email.');
            }
            else {
                response.send(`Error: no account with email ${email} found.`);
            }
        })
        console.log(existingEmail);
        response.end();
    }   
});

app.post('/register', function (request, response) {
    bcrypt.hash(request.password, SALT_ROUNDS, function (err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        if (err) {
            response.send('Error creating account');
        }
        else {
            console.log('valid')
            if (!request.PhoneNo) {
                request.PhoneNo = "NULL";
            }
            if (!request.Address) {
                request.Address = "NULL";
            }
            let params = [request.email, hash, request.name, request.PhoneNo, request.Coordinates, request.Address];
            db.run('INSERT INTO users(email, password, name, phone, coordinates, address) values(?)', params, function (err) {
                if (err) {
                    response.send('Error creating account.');
                    return console.log(err.message);
                    
                }
                // get the last insert id
                response.send('Account created successfully');
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            });
        }
    });
    response.end();
})

app.listen(8080);

db.close();