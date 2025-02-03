const constants = require('./constants');
const mongoose = require('mongoose');

async function connectDB() {
    try {
        console.log("Connecting to the database...");
        await mongoose.connect(constants.MONGO_URI);
        console.log("Connected to the database.");
    } catch(error) {
        console.error(`Something wrong when trying to connect to the database: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;