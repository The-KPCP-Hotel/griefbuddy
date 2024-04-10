import React = require('react');
import { Link } from 'react-router-dom';

function BuddyChat() {
  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>BuddyChat</h1>
    </div>
  );
}

export default BuddyChat;
