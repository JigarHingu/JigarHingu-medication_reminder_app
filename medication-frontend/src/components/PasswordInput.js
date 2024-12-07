import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="input-group password-input-group">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input-field"
                required
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password-btn"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    );
};

export default PasswordInput;
