const Acknowledgment = require('../models/Acknowledgment');
const mongoose = require('mongoose');

// Get acknowledgment details by medicine ID
exports.getAcknowledgmentById = async (req, res) => {
    try {
        const { medicineId } = req.params; // Extract medicineId from URL params
        if (!medicineId) {
            return res.status(400).json({ error: 'Medicine ID is required' });
        }

        const acknowledgment = await Acknowledgment.findOne({ medicineId });
        if (!acknowledgment) {
            return res.status(404).json({ error: 'Acknowledgment not found' });
        }

        res.status(200).json(acknowledgment);
    } catch (error) {
        console.error('Error retrieving acknowledgment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Log acknowledgment
exports.logAcknowledgment = async (req, res) => {
    try {
        const { medicineId, status } = req.body;

        // Validation for required fields
        if (!medicineId || !status) {
            return res.status(400).json({ message: 'Medicine ID and status are required' });
        }

        // Create a new acknowledgment
        const acknowledgment = await Acknowledgment.create({
            userId: req.user.id, // Assuming JWT middleware attaches req.user
            medicineId,
            status,
        });

        res.status(201).json({ message: 'Acknowledgment logged successfully', acknowledgment });
    } catch (error) {
        console.error('Error logging acknowledgment:', error);
        res.status(500).json({ message: 'Failed to log acknowledgment', error });
    }
};

// Get all acknowledgment logs for a user
exports.getUserAcknowledgments = async (req, res) => {
    try {
        const logs = await Acknowledgment.find({ userId: req.user.id }).populate('medicineId', 'name dosage');
        if (!logs.length) {
            return res.status(404).json({ message: 'No acknowledgment logs found for this user' });
        }
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error retrieving user acknowledgment logs:', error);
        res.status(500).json({ message: 'Failed to retrieve acknowledgment logs', error });
    }
};

// Super admin: Get all acknowledgment logs with filters
exports.getAllAcknowledgments = async (req, res) => {
    try {
        const { userId, dateRange } = req.query;
        const query = {};

        // Add filters dynamically
        if (userId) query.userId = userId;
        if (dateRange) {
            const [start, end] = dateRange.split(',');
            query.timestamp = {
                $gte: new Date(start),
                $lte: new Date(end),
            };
        }

        const logs = await Acknowledgment.find(query)
            .populate('medicineId', 'name dosage')
            .populate('userId', 'name email');
        res.status(200).json(logs);
    } catch (error) {
        console.error('Error retrieving all acknowledgment logs:', error);
        res.status(500).json({ message: 'Failed to retrieve acknowledgment logs', error });
    }
};