import React = require('react');
import { Link } from 'react-router-dom';

function BuddyChat() {

  return (
    <div>
      <Link to="/home" style={{fontSize: "55px"}}>⌂</Link>
      <h1>BuddyChat</h1>
    </div>
  );
}

export default BuddyChat;
