// models/Word.js
const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    language: { type: String, required: true },
    word: { type: String, required: true },
    translation: { type: String, required: true },
    meaning: { type: String, required: true },
    approved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Word', wordSchema);
