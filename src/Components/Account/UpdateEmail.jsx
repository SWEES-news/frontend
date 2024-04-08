import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './styles.css'; // Assuming the styles.css is in the same directory

const UpdateEmail = ({ userData }) => {
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = () => {
        const payload = {
            username: userData.Username,
            password: password,
            new_email: newEmail
        };

        axios.put(`${BACKEND_URL}/user/update/email`, payload)
            .then(response => {
                console.log(response);
                setMessage('Email updated successfully.');
            })
            .catch(error => {
                console.error('Error updating email:', error);
                setMessage('Failed to update email.');
            });
    };

    return (
        <div className="user-container">
            <h3>Update Email</h3>
            <div className="user-form">
                <input 
                    type="text" 
                    value={newEmail} 
                    onChange={(e) => setNewEmail(e.target.value)} 
                    placeholder="New Email"
                    className="user-form-input"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    className="user-form-input"
                />
                <button onClick={handleUpdate} className="user-form-button">Update Email</button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default UpdateEmail;
