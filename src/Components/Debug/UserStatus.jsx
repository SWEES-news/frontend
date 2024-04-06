import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import './styles.css';

const USER_STATUS_ENDPOINT = `${BACKEND_URL}/user/status`;

function UserStatusComponent() {
    const [userStatus, setUserStatus] = useState('');

    useEffect(() => {
        axios.get(USER_STATUS_ENDPOINT)
            .then(response => {
                if (response.data && response.data.User) {
                    setUserStatus(`User logged in: ${response.data.User}`);
                } else {
                    setUserStatus('No user is currently logged in.');
                }
            })
            .catch(error => {
                console.error('Error fetching user status:', error);
                setUserStatus('Unable to fetch user status.');
            });
    }, []);

    return (
        <div className="container">
            <h2>User Status</h2>
            <p>{userStatus}</p>
        </div>
    );
}

export default UserStatusComponent;
