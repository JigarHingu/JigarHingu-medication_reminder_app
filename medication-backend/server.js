// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const acknowledgmentRoutes = require('./routes/acknowledgmentRoutes');
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/medicines', medicineRoutes); // Medicine routes
app.use('/api/acknowledgments/:medicineId', acknowledgmentRoutes);

// Add root route
app.get('/', (req, res) => {
    res.send('Welcome to the Medication Reminder API! Navigate to the appropriate API endpoints.');
});

// Error handling middleware (optional, but good to have)
app.use((req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
