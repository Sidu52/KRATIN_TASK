const express = require('express');
const router = express.Router();
const auth = require('../config/auth');
const { doctor, register, appointment } = require('../controllers/doctorController');

router.get('/', doctor);
router.post('/register', register);
router.get('/appointment', auth, appointment);

module.exports = router;