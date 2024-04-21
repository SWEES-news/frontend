import React, { useState } from 'react';
import axios from 'axios';
import './../ArticleSubmission/ArticleSubmission.css'; // Reusing the same CSS as ArticleSubmission
import { BACKEND_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Users/UserContext';

const CLEAR_USERS_EP = `${BACKEND_URL}/collections/clear/users`;

const WipeUsers = () => {
    const [clearResponse, setClearResponse] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleClear = async () => {
        try {
            const response = await axios.delete(CLEAR_USERS_EP);

            if (response.data && response.data.Data) {
                setClearResponse({ message: response.data.Data });
                setUser(null);
                localStorage.removeItem('user');
            } else {
                setClearResponse({ message: 'Something strange?' });
            }

            setTimeout(() => {
                navigate('/'); // Redirect to home or other appropriate page
            }, 2000); // 2000 milliseconds = 2 seconds
        } catch (error) {
            let errorMessage = 'Error clearing Users database.';
            if (error.response && error.response.data && error.response.data.Data) {
                errorMessage = error.response.data.Data;
            }
            setClearResponse({ message: errorMessage });
        }
    };

    return (
        <div className="article-submission-container">
            <h2>Clear Users Database</h2>
            <button onClick={handleClear} className="article-submission-button">Clear Users</button>
            {clearResponse && (
                <div className="article-submission-response">
                    <p>{clearResponse.message}</p>
                </div>
            )}
        </div>
    );
}

export default WipeUsers;
