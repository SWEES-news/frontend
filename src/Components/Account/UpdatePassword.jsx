import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './styles.css'; // Import styles

const UpdatePassword = ({ userData }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = () => {
        const payload = {
            old_password: oldPassword,
            new_password: newPassword,
            confirm_new_password: confirmNewPassword
        };

        axios.put(`${BACKEND_URL}/user/update/password`, payload)
            .then(response => {
                console.log(response);
                setMessage(response.data.Data);
            })
            .catch(error => {
                console.error('Error: ', error.response.data.Data);
                setMessage('Failed to update password. ' + error.response.data.Data);
            });
    };

    return (
        <div className="user-container">
            <h3>Update Password</h3>
            <div className="user-form">
                <input 
                    type="password" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    placeholder="Old Password"
                    className="user-form-input"
                />
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="New Password"
                    className="user-form-input"
                />
                <input 
                    type="password" 
                    value={confirmNewPassword} 
                    onChange={(e) => setConfirmNewPassword(e.target.value)} 
                    placeholder="Confirm New Password"
                    className="user-form-input"
                />
                <button onClick={handleUpdate} className="user-form-button">Update Password</button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default UpdatePassword;
