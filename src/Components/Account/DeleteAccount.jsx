import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './styles.css'; // Assuming the styles.css is in the same directory

const DeleteAccount = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = () => {
        axios.delete(`${BACKEND_URL}/user/update/delete`, {
            data: { Password: password }  
        })
        .then(response => {
            setMessage('Account deleted successfully.');
            localStorage.removeItem('user');
        })
        .catch(error => {
            if (error.response) {
                setMessage(error.response.data.message || 'Error occurred during deletion.');
            } else {
                setMessage('Server connection error.');
            }
        });
    };

    return (
        <div className="user-container">
            <h3>Delete Account</h3>
            <div className="user-form">
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    className="user-form-input"
                />
                <button onClick={handleDelete} className="user-form-button">Delete Account</button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default DeleteAccount;
