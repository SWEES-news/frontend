import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './styles.css';

const ENDPOINT = `${BACKEND_URL}/user`;

function GetAllUsers() {
    const [users, setUsers] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(ENDPOINT)
            .then(response => {
                setUsers(response.data.Data); // Extracting Data from the response
                setError(null); // Resetting error state in case of successful fetch
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Setting error based on response or default message
                setError(error.response.data.Data || 'Error fetching data');
            });
    }, []); // This runs once on mount

    return (
        <div className="container">
            <h2>Users</h2>
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                <ul>
                    {Object.entries(users).map(([username, userDetails]) => (
                        <li key={username}>
                            Username: {userDetails.Username}, Email: {userDetails.Email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default GetAllUsers;
