import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import '../styles/MedicineSchedule.css'; // Styling for the component
import { toast } from 'react-toastify'; // Toast notifications
import { useNavigate } from 'react-router-dom'; // For navigation

const MedicineSchedule = () => {
    const [medicines, setMedicines] = useState([]); // List of medicines
    const [newMedicine, setNewMedicine] = useState({ name: '', dosage: '', scheduleTime: '' }); // New medicine form state
    const [editMedicineId, setEditMedicineId] = useState(null); // ID of medicine being edited
    const navigate = useNavigate(); // React Router navigate function

    // Fetch all medicines
    const fetchMedicines = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/medicines', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMedicines(response.data); // Update medicines state
        } catch (error) {
            console.error('Failed to fetch medicines', error);
            toast.error('Failed to fetch medicines');
        }
    };

    // Add or update a medicine
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (editMedicineId) {
                // Update existing medicine
                await axios.put(
                    `/medicines/${editMedicineId}`,
                    newMedicine,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success('Medicine updated successfully');
            } else {
                // Add new medicine
                await axios.post(
                    '/medicines',
                    newMedicine,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success('Medicine added successfully');
            }
            setNewMedicine({ name: '', dosage: '', scheduleTime: '' }); // Reset form
            setEditMedicineId(null); // Clear edit state
            fetchMedicines(); // Refresh medicines list
        } catch (error) {
            console.error('Failed to save medicine', error);
            toast.error('Failed to save medicine');
        }
    };

    // Delete a medicine
    const deleteMedicine = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/medicines/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchMedicines(); // Refresh medicines list
            toast.success('Medicine deleted successfully');
        } catch (error) {
            console.error('Failed to delete medicine', error);
            toast.error('Failed to delete medicine');
        }
    };

    // Log acknowledgment (mark as taken)
    const logAcknowledgment = async (medicineId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `/acknowledgments/${medicineId}`,
                { medicineId, status: 'Taken' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Acknowledgment logged successfully');

            // Redirect to acknowledgment history page
            navigate(`/acknowledgments/${medicineId}`); // Ensure this route is defined in your app
        } catch (error) {
            console.error('Failed to log acknowledgment', error);
            toast.error('Failed to log acknowledgment');
        }
    };

    // Populate form with medicine details for editing
    const startEditing = (medicine) => {
        setEditMedicineId(medicine._id); // Set the ID of the medicine being edited
        setNewMedicine({
            name: medicine.name,
            dosage: medicine.dosage,
            scheduleTime: medicine.scheduleTime,
        }); // Pre-fill form
    };

    // Cancel editing
    const cancelEditing = () => {
        setEditMedicineId(null); // Clear edit state
        setNewMedicine({ name: '', dosage: '', scheduleTime: '' }); // Reset form
    };

    useEffect(() => {
        fetchMedicines(); // Fetch medicines when the component mounts
    }, []);

    return (
        <div className="medicine-schedule">
            <h2>Medicine Schedule</h2>
            <form onSubmit={handleSubmit} className="medicine-form">
                <input
                    type="text"
                    placeholder="Medicine Name"
                    value={newMedicine.name}
                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Dosage"
                    value={newMedicine.dosage}
                    onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                    required
                />
                <input
                    type="time"
                    value={newMedicine.scheduleTime}
                    onChange={(e) =>
                        setNewMedicine({ ...newMedicine, scheduleTime: e.target.value })
                    }
                    required
                />
                <button type="submit">{editMedicineId ? 'Update Medicine' : 'Add Medicine'}</button>
                {editMedicineId && (
                    <button onClick={cancelEditing} type="button">
                        Cancel
                    </button>
                )}
            </form>
            <table className="medicine-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Dosage</th>
                        <th>Schedule Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine) => (
                        <tr key={medicine._id}>
                            <td>{medicine.name}</td>
                            <td>{medicine.dosage}</td>
                            <td>{medicine.scheduleTime}</td>
                            <td>
                                <button
                                    onClick={() => logAcknowledgment(medicine._id)}
                                    className="taken-button"
                                >
                                    Mark as Taken
                                </button>
                                <button onClick={() => startEditing(medicine)}>Edit</button>
                                <button onClick={() => deleteMedicine(medicine._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicineSchedule;
