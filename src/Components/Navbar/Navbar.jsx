import React, { useEffect, useState, useRef, createRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Users/UserContext';
import './Navbar.css'; 
import { BACKEND_URL } from '../../constants';

const USER_STATUS_ENDPOINT = `${BACKEND_URL}/user/status`;

const PAGES = [
  { label: 'Home', destination: '/' },
  { label: 'Register', destination: '/user/register' },
  { label: 'Login', destination: '/user/login' },
  { label: 'Logout', destination: '/user/logout' },
  { label: 'User/GetAll', destination: '/User/GetAll' },
  { label: 'Submit Article', destination: '/submitarticle' },
  { label: 'Get Articles', destination: '/getallarticles' },
  { label: 'Submissions', destination: '/submissions' },
];

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [dropdownVisible, setDropdownVisible] = useState({});
  const dropdownRefs = useRef(PAGES.reduce((acc, page) => {
    acc[page.label] = createRef();
    return acc;
  }, {}));

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      axios.get(USER_STATUS_ENDPOINT)
        .then(response => {
          if (response.data && response.data.User) {
            setUser(response.data.User);
            localStorage.setItem('user', JSON.stringify(response.data.User)); 
          }
        })
        .catch(error => {
          console.log("Data:", error.response.data);
        });
    }

    function handleClickOutside(event) {
      setDropdownVisible({});
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setUser]);

  const handleMouseEnter = (label) => {
    setDropdownVisible(prev => ({ ...prev, [label]: true }));
  };

  const handleMouseLeave = (label) => {
    setDropdownVisible(prev => ({ ...prev, [label]: false }));
  };

  const handleUserClick = () => {
    if (user) {
      navigate('/'); 
    } else {
      navigate('/user/register');
    }
  };

  const toggleDropdown = (label) => {
    setDropdownVisible(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">TITLE</h1>
      <ul className="navbar-menu">
        {PAGES.map((page, index) => (
          <li key={page.label} className="navbar-item"
              onMouseEnter={() => handleMouseEnter(page.label)}
              onMouseLeave={() => handleMouseLeave(page.label)}>
            {page.label === 'User/GetAll' ? (
              <span className="navbar-link">{page.label}</span>
            ) : (
              <Link to={page.destination} className="navbar-link">{page.label}</Link>
            )}
            {page.label === 'User/GetAll' && (
              <div className={`dropdown-content ${dropdownVisible[page.label] ? "show" : ""}`}
                   ref={dropdownRefs.current[page.label]}>
                <Link to="/some-path">Option 1</Link>
                <Link to="/another-path">Option 2</Link>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="navbar-user" onClick={() => toggleDropdown('user')}>
        {user ? user : 'Register'}
        {user && (
          <div className={`dropdown-content ${dropdownVisible['user'] ? "show" : ""}`}
               ref={dropdownRefs.current['user']}>
            <Link to="/account">Account</Link>
            <Link to="/user/logout">Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
