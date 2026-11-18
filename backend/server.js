const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Headlines AI Backend with Supabase!");
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        message: "Headlines AI API is working!",
        database: "Supabase PostgreSQL",
        status: "Success"
    });
});

// Supabase headline routes
app.use(
    "/api/headlines",
    require("./routes/headlineRoutes")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});