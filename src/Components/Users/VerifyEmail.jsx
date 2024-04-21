// VerifyEmail.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './../ArticleSubmission/ArticleSubmission.css';
import { BACKEND_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const ENDPOINT = `${BACKEND_URL}/user/verify-email`;

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [submissionResponse, setSubmissionResponse] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationData = {
            verification_code: verificationCode,
        };

        try {
            const response = await axios.post(ENDPOINT, verificationData);
            console.log('Response as a dictionary:', JSON.stringify(response.data, null, 2)); // Print the response as a JSON string
            setSubmissionResponse({ message: "Email successfully verified!" });
            setTimeout(() => {
                navigate('/users/register'); // Assuming you have a route set up for the final registration details submission
            }, 800);
        } catch (error) {
            console.error('Error during email verification: ', error);
            console.log("Endpoint URL:", ENDPOINT);
            if (error.response) {
                // Handle errors sent by the server
                const errorMessage = error.response.data.Data || error.response.data.message || 'Invalid or expired verification code.';
                setSubmissionResponse({ message: errorMessage });
            } else if (error.request) {
                // Handle errors where the request was made but no response was received
                setSubmissionResponse({ message: "No response from server." });
            } else {
                // Handle other errors
                setSubmissionResponse({ message: "Error verifying email."});
            }
        }
    };

    return (
        <div className="article-submission-container">
            <h2>Verify Email</h2>
            <form onSubmit={handleSubmit} className="article-submission-form">
                <label>
                    Verification Code:
                    <input 
                        type="text" 
                        value={verificationCode} 
                        onChange={e => setVerificationCode(e.target.value)}
                        className="article-submission-input"
                    />
                </label>
                <button type="submit" className="article-submission-button">Verify Code</button>
            </form>
            {submissionResponse && (
                <div className="article-submission-response">
                    <p>{submissionResponse.message}</p>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
