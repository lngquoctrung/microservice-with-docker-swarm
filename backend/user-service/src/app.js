const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./database");

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const app = express();

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