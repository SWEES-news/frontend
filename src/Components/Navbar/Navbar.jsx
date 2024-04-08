import React, { useEffect, useState, useRef, createRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Users/UserContext';
import './Navbar.css'; 
import { BACKEND_URL } from '../../constants';

const USER_STATUS_ENDPOINT = `${BACKEND_URL}/user/status`;
const TITLE = 'SWEES';

const PAGES = [
  { label: 'Home', destination: '/' },
  { label: 'Hot', destination: '/getallarticles' },
  { label: 'Submit Article', destination: '/submitarticle' },
  { label: 'Submissions', destination: '/submissions' },
  { label: 'DEBUG' },
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
      navigate('/user/login');
    }
  };

  const toggleDropdown = (label) => {
    setDropdownVisible(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const filteredPages = PAGES.filter(page => {
    // Show the 'Submissions' page only if user is logged in
    if (page.label === 'Submissions' || page.label === 'Submit Article') {
      return user != null;
    }

    // cool idea
    // if (page.label === 'DEBUG') {
    //   return user != null && user === 'admin';
    // }

    return true;
  });

  return (
    <nav className="navbar">
      <a href=""><h1  className="navbar-title logo">{TITLE}</h1></a>
      <ul className="navbar-menu">
        {filteredPages.map((page, index) => (
          <li key={page.label} className="navbar-item"
              onMouseEnter={() => handleMouseEnter(page.label)}
              onMouseLeave={() => handleMouseLeave(page.label)}>
            {(<Link to={page.destination} className="navbar-link">{page.label}</Link>)}
            {page.label === 'DEBUG' && (
              <div className={`dropdown-content ${dropdownVisible[page.label] ? "show" : ""}`}
                   ref={dropdownRefs.current[page.label]}>
                <Link to="/users/getall">All Users</Link>
                <Link to="/users/deteteall">Delete Users</Link>
                <Link to="/articles/deleteall">Delete Articles</Link>
                <Link to="/users/status">User Status</Link>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="navbar-item navbar-user"
           onMouseEnter={() => handleMouseEnter('user')}
           onMouseLeave={() => handleMouseLeave('user')}>
        <span className="navbar-link">{user ? "Welcome, " + user : 'Register/Login'}</span>
        {user && (
          <div className={`dropdown-content ${dropdownVisible['user'] ? "show" : ""}`}>
            <Link to="/users/account" >Account</Link>
            <Link to="/users/logout" >Logout</Link>
          </div>
        )}
        {!user && (
          <div className={`dropdown-content ${dropdownVisible['user'] ? "show" : ""}`}>
            <Link to="/users/register" >Register</Link>
            <Link to="/users/login" >Login</Link>
          </div>
        )}
      </div>
      
    </nav>
  );
}

export default Navbar;
