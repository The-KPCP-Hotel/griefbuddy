import React = require('react');
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/buddy">Buddy</Link>
        </li>
        <li>
          <Link to="/chatbot">ChatBot</Link>
        </li>
        <li>
          <Link to="/events">Local Happenings</Link>
        </li>
        <li>
          <Link to="/resources">Resources</Link>
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
