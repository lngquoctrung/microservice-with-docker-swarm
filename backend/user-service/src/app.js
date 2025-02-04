const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const connectDB = require("./database");

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/health-check", (req, res) => {
    return res.status(200).json({
        status: 200,
        message: "The server is UP",
    })
});

app.use("/api/v1/users", require("./userRouter"));

app.listen(PORT, HOST, async () => {
    console.clear();
    await connectDB();
    console.log(`The server started on http://${HOST}:${PORT}`);
});