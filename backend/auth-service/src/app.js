const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/health-check", (req, res) => {
    return res.status(200).json({
        status: 200,
        message: "The server is UP"
    });
});

app.use("/api/v1/auth", require("./authRouter"));

app.listen(PORT, HOST, () => {
    console.clear();
    console.log(`The server started on http://${HOST}:${PORT}`);
});