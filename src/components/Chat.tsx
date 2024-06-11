import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
  Box,
  Center,
  Container,
  Heading,
  Stack,
  StackDivider,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';

import ChatInput from './ChatComponents/ChatInput';
import UserSearchInput from './ChatComponents/UserSearchInput';

const socket = io();

function Chat() {
  interface Message {
    msg: string;
    clientOffset: string;
  }

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([] as Message[]);

  const [searchedUser, setSearchedUser] = useState('');

  const messagesEndRef = useRef(null);

  const bottomScroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(bottomScroll, [messages]);

  const onChange = (e: { target: { value: string; id: string } }) => {
    const { value, id } = e.target;
    // console.log(id);
    switch (id) {
      case 'chat':
        setMessage(value);
        break;
      case 'user':
        setSearchedUser(value);
        break;
      default:
        throw new Error('input id has no matching valid case');
    }
  };

  // let counter = 0;

  useEffect(() => {
    const addMessage = (msg: string, clientOffset: string) => {
      setMessages((curMessages) => curMessages.concat([{ msg, clientOffset }]));
    };
    socket.on('sendMsg', addMessage);
  }, [setMessages]);

  // needs socket
  const onSend = () => {
    if (message) {
      // const clientOffset = `${socket.id}-${(counter += 1)}`;
      // socket.emit('msg', message, clientOffset);
      socket.emit('msg', message, socket.id);
    }
    setMessage('');
  };

  const onPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  const color = useColorModeValue('blue.600', 'blue.200');

  const otherUserBG = useColorModeValue('lavender', 'purple.700');

  const otherUserColor = useColorModeValue('purple', 'lavender');

  return (
    <Container>
      <Center>
        <Heading color={color}>Chat</Heading>
      </Center>
      {searchedUser}
      <UserSearchInput onChange={onChange} />
      <Center>
        <Text>This is currently a chat with between you and anyone else logged on the chat!</Text>
      </Center>
      <Box overflowY="auto" maxHeight="70vh" marginBottom="10px" marginTop="15px">
        <Stack divider={<StackDivider />} margin="8px">
          {messages.map((msg, index) => (
            <Text
              // eslint-disable-next-line react/no-array-index-key
              key={`${msg.clientOffset}-${index}`}
              borderRadius="10px"
              background={msg.clientOffset === socket.id ? 'blue.600' : otherUserBG}
              p="10px"
              color={msg.clientOffset === socket.id ? 'white' : otherUserColor}
              textAlign={msg.clientOffset === socket.id ? 'right' : 'left'}
              marginLeft={msg.clientOffset === socket.id ? 'auto' : 0}
              width="fit-content"
            >
              {msg.msg}
            </Text>
          ))}
        </Stack>
        <ChatInput
          messagesEndRef={messagesEndRef}
          message={message}
          onChange={onChange}
          onSend={onSend}
          onPress={onPress}
        />
      </Box>
    </Container>
  );
}

export default Chat;
