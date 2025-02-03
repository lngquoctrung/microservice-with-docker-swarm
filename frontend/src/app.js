const express = require('express');
const path = require('path');
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

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(PORT, HOST, () => {
    console.clear();
    console.log(`The server started on http://${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('The server is DOWN');
        process.exit(1);
    });
});