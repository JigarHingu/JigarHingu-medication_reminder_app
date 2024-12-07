import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import PasswordInput from './PasswordInput';
import { toast } from 'react-toastify';
import '../styles/MedicineSchedule.css'; // Ensure this CSS file is created for styling

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            await axios.post('/auth/register', { name, email, password });
            toast.success('Registration successful!');
            navigate('/login'); // Navigate to login after registration
        } catch (error) {
            toast.error('Error registering, please try again');
            setErrorMessage(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="auth-form">
            <h2>Register</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-field"
                />
            </div>
            <div className="input-group">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
            </div>
            <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </button>
            <div className="auth-link">
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </form>
    );
};

export default Register;
