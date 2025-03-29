const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;
if(!HOST || !PORT) {
    console.error('Error missing some configuration for server');
    process.exit(1);
}

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.listen(PORT, HOST, () => {
    console.clear();
    console.log(`The server started on http://${HOST}:${PORT}`);
});