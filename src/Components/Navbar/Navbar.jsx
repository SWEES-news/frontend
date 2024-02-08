import React from 'react';
import { Link } from 'react-router-dom';

const PAGES = [
  { label: 'Home', destination: '/' },
  { label: 'Games', destination: '/games' },
  { label: 'Users', destination: '/users' },
]

const mapper = (page) => <li><Link to={page.destination}>{page.label}</Link></li>;

function Navbar() {
  return (
    <nav>
      <ul>
        {PAGES.map(mapper)}
      </ul>
    </nav>
  );
}

export default Navbar;