const express = require('express');
const { addItem, getItems, deleteItem } = require('../controller/checklistController');
const router = express.Router();

router.post('/add', addItem);
router.get('/list', getItems);
router.delete('/delete/:id', deleteItem);

module.exports = router;
