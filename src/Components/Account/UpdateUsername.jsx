import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './styles.css'; // Import styles

const UpdateUsername = ({ userData }) => {
    const [newUsername, setNewUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = () => {
        const payload = {
            old_username: userData.Username,
            new_username: newUsername,
            password: password
        };

        axios.put(`${BACKEND_URL}/user/update/username`, payload)
            .then(response => {
                console.log(response);
                setMessage('Username updated successfully.');
            })
            .catch(error => {
                console.error('Error updating username:', error);
                setMessage('Failed to update username.');
            });
    };

    return (
        <div className="user-container">
            <h3>Update Username</h3>
            <div className="user-form">
                <input 
                    type="text" 
                    value={newUsername} 
                    onChange={(e) => setNewUsername(e.target.value)} 
                    placeholder="New Username"
                    className="user-form-input"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    className="user-form-input"
                />
                <button onClick={handleUpdate} className="user-form-button">Update Username</button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default UpdateUsername;
