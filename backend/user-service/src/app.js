const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const constants = require('./config/constants');
const connectDB = require('./config/database');
const responseHelper = require('./helpers/responseHelper');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/health-check', (req, res) => {
    return res.status(200).json(
        responseHelper.success(
            200,
            "OK",
            "The server is UP",
        )
    );
});

app.use((req, res) => {
    return res.status(404).json(
        responseHelper.error(
            404,
            "Not found",
            "The route is invalid or not found",
            constants.ERROR_CODES.NOT_FOUND,
        )
    );
});

const server = app.listen(constants.PORT, constants.HOST, async () => {
    console.clear();
    await connectDB();
    console.log(`The server started on http://${constants.HOST}:${constants.PORT}`);
});

process.on('SIGTERM', () => {
    server.on('close', () => {
        console.log("The server is DOWN");
        process.exit(1);
    });
});