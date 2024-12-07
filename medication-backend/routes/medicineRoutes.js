// routes/medicineRoutes.js
const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware to check JWT token

// Middleware to check if the user is authenticated
router.use(authMiddleware);

// Fetch all medicines
router.get('/', medicineController.getMedicines);

// Add a new medicine
router.post('/', medicineController.addMedicine);

// Update a medicine
router.put('/:id', medicineController.updateMedicine);

// Delete a medicine
router.delete('/:id', medicineController.deleteMedicine);

module.exports = router;
