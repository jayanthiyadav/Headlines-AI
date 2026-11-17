const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    dbName: "headlinecraft"
})
.then(() => {
    console.log("MongoDB Connected Successfully!");
})
.catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
});

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to HeadlineCraft AI Backend!");
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        message: "HeadlineCraft AI API is working!",
        status: "Success"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});