import React = require('react');
import { Link } from 'react-router-dom';

function ChatBot() {
  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>Chat Bot</h1>
    </div>
  );
}

export default ChatBot;
