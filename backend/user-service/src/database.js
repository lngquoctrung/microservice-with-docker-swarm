const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const MONGODB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connectDB = async () => {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to database.");
    } catch(error) {
        console.error("Something wrong when trying to connect to the database.");
        console.error(`Error details: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;