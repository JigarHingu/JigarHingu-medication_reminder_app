import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
