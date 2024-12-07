import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicineSchedule from './components/MedicineSchedule.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Acknowledgment from './components/Acknowledgment';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/medicine-schedule" element={<MedicineSchedule />} />
                    <Route path="/acknowledgments/:medicineId" element={<Acknowledgment />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
