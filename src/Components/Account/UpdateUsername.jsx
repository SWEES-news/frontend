import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './styles.css'; // Import styles
import { useUser } from './../Users/UserContext';

const ENDPOOINT = `${BACKEND_URL}/user/update/username`;

const UpdateUsername = ({ userData }) => {
    const [newUsername, setNewUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setUser } = useUser();

    const handleUpdate = () => {
        const payload = {
            Username: newUsername,
            Password: password
        };
    
        axios.put(ENDPOOINT, payload)
            .then(response => {
                console.log(response);
                setMessage('Username updated successfully.');
                userData.Username = newUsername;
                setUser(newUsername); 
    
                // Here, the username is stringified before storing
                localStorage.setItem('user', JSON.stringify(newUsername)); 
            })
            .catch(error => {
                console.error('Error updating username:', error);
    
                let errorMessage = 'Failed to update username.';
                if (error.response && error.response.data) {
                    try {
                        errorMessage += error.response.data.Data;
                    } catch (e) {
                        errorMessage += ' Unexpected server response.';
                    }
                }
                setMessage(errorMessage);
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
