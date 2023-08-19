const express = require('express');
const router = express.Router();
const auth = require('../config/auth');

const { appointment, login, register, addTask, gettask, updateTask } = require('../controllers/userController');
router.get('/tasks/:id', auth, gettask);
router.post('/appointment', appointment);
router.post('/signin', login);
router.post('/register', register);
router.post('/addtask', auth, addTask);
router.post('/updateTask', auth, updateTask);

module.exports = router;