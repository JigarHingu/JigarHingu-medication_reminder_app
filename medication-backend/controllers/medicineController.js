// controllers/medicineController.js
const Medicine = require('../models/Medicine');

// Fetch all medicines
const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).json(medicines); // Return the list of medicines
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch medicines' });
    }
};

// Add a new medicine
const addMedicine = async (req, res) => {
    const { name, dosage, scheduleTime } = req.body;
    try {
        // Create a new medicine
        const newMedicine = new Medicine({ name, dosage, scheduleTime });
        await newMedicine.save(); // Save the medicine to the database
        res.status(201).json(newMedicine); // Return the added medicine
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error adding medicine' });
    }
};

// Update an existing medicine
const updateMedicine = async (req, res) => {
    const { id } = req.params;
    const { name, dosage, scheduleTime } = req.body;
    try {
        // Find the medicine by ID and update
        const updatedMedicine = await Medicine.findByIdAndUpdate(id, { name, dosage, scheduleTime }, { new: true });
        if (!updatedMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.status(200).json(updatedMedicine); // Return the updated medicine
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating medicine' });
    }
};

// Delete a medicine
const deleteMedicine = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the medicine by ID and delete
        const deletedMedicine = await Medicine.findByIdAndDelete(id);
        if (!deletedMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
        }
        res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error deleting medicine' });
    }
};

module.exports = {
    getMedicines,
    addMedicine,
    updateMedicine,
    deleteMedicine
};
