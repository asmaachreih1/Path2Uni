
const express = require('express');
const router = express.Router();
//const { getTasks, addTask, deleteTask, toggleTask } = require('../controller/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');
const taskController = require('../controller/taskController');


router.use(authMiddleware); // Protect all task routes

router.get('/', authMiddleware, taskController.getTasks);
router.post('/', authMiddleware, taskController.addTask);
router.put('/toggle/:id', authMiddleware, taskController.toggleTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
