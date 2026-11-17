const express = require("express");
const router = express.Router();

const Headline = require("../models/Headline");

// Save headlines
router.post("/save", async (req, res) => {
    try {
        const { topic, category, tone, headlines } = req.body;

        const newHeadline = new Headline({
            topic,
            category,
            tone,
            headlines
        });

        await newHeadline.save();

        res.status(201).json({
            message: "Headlines saved successfully!",
            data: newHeadline
        });

    } catch (error) {
        res.status(500).json({
            message: "Error saving headlines",
            error: error.message
        });
    }
});

module.exports = router;