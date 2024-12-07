const express = require('express');
const router = express.Router();
const acknowledgmentController = require('../controllers/acknowledgmentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Log acknowledgment
router.post('/', authMiddleware, acknowledgmentController.logAcknowledgment);

// Get acknowledgment details by ID
router.get('/:medicineId', authMiddleware, acknowledgmentController.getAcknowledgmentById);

module.exports = router;
