import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Heading, Center, Container } from '@chakra-ui/react';

const socket = io('http://localhost:3000');

function BuddyChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  const handleMessage = () => {
    // send a message comprised of user input
    // const messageId = Date.now();
    // { id: messageId, text: input }; || allowed for each messageID to be determinate of the date
    // this stopped messageID's from being the same
    if (input.trim() !== '') {
      const newMessage = { text: input, room, sender: 'senderTrue' };
      socket.emit('message', newMessage);
      setInput('');
    }
  };

  // receiving messages and updating the chat
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off('receive_message');
    };
  }, []);

  // eslint with the help of ts helped with this structure
  const getMessageColor = (message: { sender: string }) =>
    message.sender === socket.id ? 'blue' : 'lightgreen';

  return (
    <>
      <Center>
        <Heading size="3xl" color={'blue.200'}>
          Buddy Chat
        </Heading>
      </Center>
      <Container maxW="7xl">
        <input
          type="text"
          placeholder="BuddyPair ID"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="button" onClick={joinRoom}>
          Join Room
        </button>
        <div>
          {messages.map((message) => (
            // can use timestamps instead of Date
            <div key={message.timestamp} style={{ color: getMessageColor(message) }}>
              {message.text}
            </div>
          ))}
        </div>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="button" onClick={handleMessage}>
          Send
        </button>
      </Container>
    </>
  );
}

// export default BuddyChat;
