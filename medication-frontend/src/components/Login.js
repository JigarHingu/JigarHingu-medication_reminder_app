import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import PasswordInput from './PasswordInput';
import { toast } from 'react-toastify';
import '../styles/MedicineSchedule.css'; // Ensure this CSS file is created for styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post('/auth/login', { email, password });
            toast.success('Login successful!');
            localStorage.setItem('token', response.data.token); // Save token
            navigate('/medicine-schedule'); // Navigate to the schedule page
        } catch (error) {
            toast.error('Invalid credentials, please try again');
            setErrorMessage(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleLogin} className="auth-form">
            <h2>Login</h2>
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
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="auth-link">
                <p>Don't have an account? <a href="/register">Register here</a></p>
            </div>
        </form>
    );
};

export default Login;
