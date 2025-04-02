const Checklist = require('../models/checklistModel');

// Add a new checklist item
exports.addItem = async (req, res) => {
    try {
        const { text } = req.body;
        const newItem = new Checklist({ text });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all checklist items
exports.getItems = async (req, res) => {
    try {
        const items = await Checklist.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a checklist item
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Checklist.findByIdAndDelete(id);
        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
