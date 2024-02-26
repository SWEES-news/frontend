import React, { useState } from 'react';
import axios from 'axios';
import './../ArticleSubmission/ArticleSubmission.css';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submissionResponse, setSubmissionResponse] = useState(null); // New state for the submission response

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const userData = {
            Username: name,
            Email: email,
            Password: password,
        };

        try {
            const response = await axios.post('/user', userData);
            console.log('User added:', response.data);
            setSubmissionResponse({ message: "User added successfully!", submission_id: response.data.id }); // Set success message
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error adding user:', error);
            setSubmissionResponse({ message: "Error adding user.", submission_id: "" }); // Set error message
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
                    <p>Submission ID: {submissionResponse.submission_id}</p>
                </div>
            )}
        </div>
    );
};

export default AddUser;
