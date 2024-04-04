import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import axios from 'axios';
import { useUser } from '../Users/UserContext';

const USER_STATUS_ENDPOINT = `${BACKEND_URL}/user/status`;

const PAGES = [
  { label: 'Home', destination: '/' },
  { label: 'register', destination: 'user/register' },
  { label: 'login', destination: 'user/login' },
  { label: 'logout', destination: 'user/logout' },
  { label: 'User/GetAll', destination: 'User/GetAll' },
  { label: 'Submit Article', destination: '/submitarticle' },
  { label: 'Get Articles', destination: '/getallarticles' },
  { label: 'Submissions', destination: '/submissions' },
]

const mapper = (page) => <li><Link to={page.destination}>{page.label}</Link></li>;

function Navbar() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    axios.get(USER_STATUS_ENDPOINT)
      .then(response => {
        if (response.data && response.data.User) {
          console.log("User:", response.data.User);
          setUserName(response.data.User);
        }
      })
      .catch(error => {
        console.log("Data:", error.response.data);
        setUserName('Register');
      });
  }, [setUser]);

  const handleUserClick = () => {
    if (user) {
        navigate('/user/home'); // Or any user-specific page
    } else {
        navigate('/user/register');
    }
};

  return (
  <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
      {PAGES.map(page => (
        <li key={page.label} style={{ margin: '0 10px' }}>
          <Link to={page.destination}>{page.label}</Link>
        </li>
      ))}
    </ul>
    <span onClick={handleUserClick} style={{ cursor: 'pointer', margin: '0 50px' }}>
      {user ? user.name : 'Register'} {/* Display user name if logged in, else 'Register' */}
    </span>
  </nav>
);
}

export default Navbar;