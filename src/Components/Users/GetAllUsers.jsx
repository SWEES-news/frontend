import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../constants';

const ENDPOINT = `${BACKEND_URL}/user`;

function GetAllUsers() {
    const [users, setUsers] = useState({});

    useEffect(() => {
        fetch(ENDPOINT)
            .then(response => response.json())
            .then(data => setUsers(data.Data)) // Extracting Data from the response
            .catch(error => console.error('Error fetching data:', error));
    }, []); // This runs once on mount

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {Object.entries(users).map(([username, userDetails]) => (
                    <li key={username}>
                        Username: {userDetails.Username}, Email: {userDetails.Email}
                        {/* Display more user details here if needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GetAllUsers;
