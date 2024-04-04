import React, { useState } from 'react';
import axios from 'axios';
import './../ArticleSubmission/ArticleSubmission.css';
import { BACKEND_URL } from '../../constants';

const ENDPOINT = `${BACKEND_URL}/user/register`;

const RegisterUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submissionResponse, setSubmissionResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            Username: name,
            Email: email,
            Password: password,
        };

        try {
            const response = await axios.post(ENDPOINT, userData);
            console.log('Response as a dictionary:', JSON.stringify(response.data, null, 2)); // Print the response as a JSON string
            const userId = response.data.UserID;
            console.log("User added successfully!", userId);
            setSubmissionResponse({ message: "User added successfully!", userId: userId });
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error adding user:', error);
            if (error.response) {
                // Handle errors sent by the server
                const errorMessage = error.response.data.Data || 'Error adding user.';
                setSubmissionResponse({ message: errorMessage, userId: "" });
            } else if (error.request) {
                // Handle errors where the request was made but no response was received
                setSubmissionResponse({ message: "No response from server.", userId: "" });
            } else {
                // Handle other errors
                setSubmissionResponse({ message: "Error adding user.", userId: "" });
            }
        }
    };

    return (
        <div className="article-submission-container">
            <form onSubmit={handleSubmit} className="article-submission-form">
                <label>
                    Name:
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        className="article-submission-input"
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
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
                <button type="submit" className="article-submission-button">Add User</button>
            </form>
            {submissionResponse && (
                <div className="article-submission-response">
                    <p>{submissionResponse.message}</p>
                    <p>User ID: {submissionResponse.userId}</p>
                </div>
            )}
        </div>
    );
};

export default RegisterUser;
