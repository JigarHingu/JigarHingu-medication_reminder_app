import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Acknowledgment = () => {
    const { medicineId } = useParams(); // Get medicineId from URL params
    const [acknowledgments, setAcknowledgments] = useState([]); // State to hold acknowledgment data

    useEffect(() => {
        const fetchAcknowledgment = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/acknowledgments/${medicineId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAcknowledgments(response.data); // Update acknowledgment data
            } catch (error) {
                console.error('Failed to fetch acknowledgment', error);
                toast.error('Failed to fetch acknowledgment');
            }
        };

        fetchAcknowledgment();
    }, [medicineId]);

    return (
        <div>
            <h2>Acknowledgment Logs</h2>
            {acknowledgments.length > 0 ? (
                <ul>
                    {acknowledgments.map((ack) => (
                        <li key={ack._id}>
                            <p>Status: {ack.status}</p>
                            <p>Time: {new Date(ack.timestamp).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No acknowledgment logs found.</p>
            )}
        </div>
    );
};

export default Acknowledgment;
