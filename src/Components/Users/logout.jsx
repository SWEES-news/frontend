import React, { useState } from 'react';
import axios from 'axios';
import './../ArticleSubmission/ArticleSubmission.css'; // Reusing the same CSS as ArticleSubmission
import { BACKEND_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const LOGOUT_ENDPOINT = `${BACKEND_URL}/user/logout`;

const LogoutUser = () => {
    const [logoutResponse, setLogoutResponse] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogout = async () => {
        try {
            await axios.get(LOGOUT_ENDPOINT);

            setLogoutResponse({ message: 'Logout successful' });
        } catch (error) {
            let errorMessage = 'Error logging out.';
            if (error.response && error.response.data && error.response.data.Data) {
                errorMessage = error.response.data.Data;
            }
            setLogoutResponse({ message: errorMessage });
        }
        setUser(null);
        localStorage.removeItem('user');
        setTimeout(() => {
            navigate('/users/login');
        }, 500);  // 1000 milliseconds = 1 second
    };

    return (
        <div className="article-submission-container">
            <h2>Logout</h2>
            <button onClick={handleLogout} className="article-submission-button">Log Out</button>
            {logoutResponse && (
                <div className="article-submission-response">
                    <p>{logoutResponse.message}</p>
                </div>
            )}
        </div>
    );
}

export default LogoutUser;
