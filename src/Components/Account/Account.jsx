import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import DeleteAccount from './DeleteAccount';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import UpdateUsername from './UpdateUsername';
import './styles.css'; // Import styles

const ENDPOINT = `${BACKEND_URL}/user/account`;

const AccountPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log('Fetching user data...');
        axios.get(ENDPOINT)
            .then(response => {
                console.log('User data received:', response.data);
                setUserData(response.data.Data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    // Log when userData state changes
    useEffect(() => {
        if (userData) {
            console.log('UserData updated:', userData);
        }
    }, [userData]);

    return (
        <div className="user-container">
            {userData && (
                <div className="user-details">
                    <h2>Account Information</h2>
                    <p>Username: {userData.Username}</p>
                    <p>Email: {userData.Email}</p>
                </div>
            )}
            <UpdateUsername userData={userData} />
            <UpdateEmail userData={userData} />
            <UpdatePassword userData={userData} />
            <DeleteAccount userData={userData} />
        </div>
    );
}

export default AccountPage;
