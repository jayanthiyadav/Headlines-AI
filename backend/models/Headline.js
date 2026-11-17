
const mongoose = require("mongoose");

const headlineSchema = new mongoose.Schema({

    topic: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    tone: {
        type: String,
        required: true
    },

    headlines: {
        type: [String],
        required: true
    }

}, {
    timestamps: true
});

const Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;
