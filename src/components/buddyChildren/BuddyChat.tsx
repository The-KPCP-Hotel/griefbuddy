import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function BuddyChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // receiving messages and updating the chat
  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off('message');
    };
  }, []);

  const handleMessage = () => {
    // send a message comprised of user input
    const messageId = Date.now();
    // { id: messageId, text: input }; || allowed for each messageID to be determinate of the date
    // this stopped messageID's from being the same
    socket.emit('message', { id: messageId, text: input });
    setInput('');
  };

  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>Buddy Chat</h1>
      <div>
        {messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="button" onClick={handleMessage}>Send</button>
    </div>
  );
}

export default BuddyChat;
