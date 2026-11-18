const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// Save headline
router.post("/save", async (req, res) => {
    try {
        const { topic, category, tone, headline } = req.body;

        if (!topic || !headline) {
            return res.status(400).json({
                message: "Topic and headline are required"
            });
        }

        const { data, error } = await supabase
            .from("headlines")
            .insert([{
                topic,
                category: category || null,
                tone: tone || null,
                headline
            }])
            .select()
            .single();

        if (error) throw error;

        return res.status(201).json({
            message: "Headline saved successfully!",
            data
        });

    } catch (error) {
        console.error("Save headline error:", error.message);

        return res.status(500).json({
            message: "Error saving headline",
            error: error.message
        });
    }
});

// Get all saved headlines
router.get("/all", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("headlines")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        return res.status(200).json(data);

    } catch (error) {
        console.error("Fetch headlines error:", error.message);

        return res.status(500).json({
            message: "Error fetching headlines"
        });
    }
});

module.exports = router;