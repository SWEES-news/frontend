// StartRegistration.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './../ArticleSubmission/ArticleSubmission.css';
import { BACKEND_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const ENDPOINT = `${BACKEND_URL}/user/register/start`;

const StartRegistration = () => {
    const [email, setEmail] = useState('');
    const [submissionResponse, setSubmissionResponse] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailData = {
            Email: email,
        };

        try {
            const response = await axios.post(ENDPOINT, emailData);
            console.log('Response as a dictionary:', JSON.stringify(response.data, null, 2)); // Print the response as a JSON string
            setSubmissionResponse({ message: "Verification email sent. Check your email!" });
            setTimeout(() => {
                navigate('/users/verifyemail'); // Assuming you have a route set up for '/verify-email'
            }, 800);
        } catch (error) {
            console.error('Error during email submission: ', error);
            console.log("Endpoint URL:", ENDPOINT);
            if (error.response) {
                // Handle errors sent by the server
                const errorMessage = error.response.data.Data || error.response.data.message || 'Error submitting email.';
                setSubmissionResponse({ message: errorMessage });
            } else if (error.request) {
                // Handle errors where the request was made but no response was received
                setSubmissionResponse({ message: "No response from server." });
            } else {
                // Handle other errors
                setSubmissionResponse({ message: "Error submitting email."});
            }
        }
    };

    return (
        <div className="article-submission-container">
            <h2>Start Registration</h2>
            <form onSubmit={handleSubmit} className="article-submission-form">
                <label>
                    Email:
                    <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        className="article-submission-input"
                    />
                </label>
                <button type="submit" className="article-submission-button">Send Verification Email</button>
            </form>
            {submissionResponse && (
                <div className="article-submission-response">
                    <p>{submissionResponse.message}</p>
                </div>
            )}
        </div>
    );
};

export default StartRegistration;
