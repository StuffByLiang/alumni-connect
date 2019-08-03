import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/sample-page">Sample Page</Link></li>
    </ul>
  </nav>
);

export default Navbar;
