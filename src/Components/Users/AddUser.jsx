import React, { useState } from 'react';
import './../ArticleSubmission/ArticleSubmission.css'; // Import the CSS file

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password);
        setName('');
        setEmail('');
        setPassword('');
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
        </div>
    );
};

export default AddUser;
