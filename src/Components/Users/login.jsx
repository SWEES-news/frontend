import React, { useState } from 'react';
import axios from 'axios';
import './../ArticleSubmission/ArticleSubmission.css'; // Reusing the same CSS as ArticleSubmission
import { BACKEND_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const LOGIN_ENDPOINT = `${BACKEND_URL}/user/login`;

const LoginUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginResponse, setLoginResponse] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_ENDPOINT, {
                Username: username,
                Password: password,
            });

            const userId = response.data.UserID;
            setLoginResponse({ message: 'Login successful', userId });
            setUser(username); 
            setTimeout(() => {
                navigate('/');
            }, 1000);  // 1000 milliseconds = 1 second
        } catch (error) {
            let errorMessage = 'Error logging in.';
            if (error.response && error.response.data && error.response.data.Data) {
                errorMessage = error.response.data.Data;
            }
            setLoginResponse({ message: errorMessage, userId: null });
        }
    };

    return (
        <div className="article-submission-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="article-submission-form">
                <div>
                    <label>
                        Username:
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                            className="article-submission-input"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            className="article-submission-input"
                        />
                    </label>
                </div>
                <button type="submit" className="article-submission-button">Log In</button>
            </form>
            {loginResponse && (
                <div className="article-submission-response">
                    <p>{loginResponse.message}</p>
                    {loginResponse.userId && <p>User ID: {loginResponse.userId}</p>}
                </div>
            )}
        </div>
    );
}

export default LoginUser;
