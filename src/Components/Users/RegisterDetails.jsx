import React, { useState } from 'react';
import axios from 'axios';
import './../ArticleSubmission/ArticleSubmission.css';
import { BACKEND_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const ENDPOINT = `${BACKEND_URL}/user/register/finish`;

const RegisterDetails = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submissionResponse, setSubmissionResponse] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setSubmissionResponse({ message: "Passwords do not match." });
            return;
        }

        const userDetails = {
            Username: username,
            FirstName: firstName,
            LastName: lastName,
            Password: password,
            confirm_password: confirmPassword,
        };

        try {
            const response = await axios.post(ENDPOINT, userDetails);
            console.log('Response as a dictionary:', JSON.stringify(response.data, null, 2)); // Print the response as a JSON string
            // setSubmissionResponse({ message: "User added successfully!", userId: response.data[users.OBJECTID] });
            setSubmissionResponse({ message: "User added successfully!"});
            setTimeout(() => {
                navigate('/users/login'); 
            }, 2000);
        } catch (error) {
            console.error('Error adding user details: ', error);
            console.log("Endpoint URL:", ENDPOINT);
            if (error.response) {
                // Handle errors sent by the server
                const errorMessage = error.response.data.Data || error.response.data.message || 'Failed to add user.';
                setSubmissionResponse({ message: errorMessage });
            } else if (error.request) {
                // Handle errors where the request was made but no response was received
                setSubmissionResponse({ message: "No response from server." });
            } else {
                // Handle other errors
                setSubmissionResponse({ message: "Error adding user details." });
            }
        }
    };

    return (
        <div className="article-submission-container">
            <h2>Complete Registration</h2>
            <form onSubmit={handleSubmit} className="article-submission-form">
                <label>
                    Username:
                    <input 
                        type="text" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)}
                        className="article-submission-input"
                    />
                </label>
                <label>
                    First Name:
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={e => setFirstName(e.target.value)}
                        className="article-submission-input"
                    />
                </label>
                <label>
                    Last Name:
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={e => setLastName(e.target.value)}
                        className="article-submission-input"
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        className="article-submission-input"
                    />
                </label>
                <label>
                    Confirm Password:
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="article-submission-input"
                    />
                </label>
                <button type="submit" className="article-submission-button">Register</button>
            </form>
            {submissionResponse && (
                <div className="article-submission-response">
                    <p>{submissionResponse.message}</p>
                </div>
            )}
        </div>
    );
};

export default RegisterDetails;
