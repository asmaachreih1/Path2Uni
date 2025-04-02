const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
    text: { type: String, required: true },
    checked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Checklist', checklistSchema);
