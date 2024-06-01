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

const socket = io();

function Chat() {
  // const socket = io();

  interface Message {
    msg: string;
    clientOffset: string;
  }

  // const [socket, setSocket] = useState(null);

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([] as Message[]);

  const messagesEndRef = useRef(null);

  const bottomScroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(bottomScroll, [messages]);

  const onChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setMessage(value);
  };

  let counter = 0;

  useEffect(() => {
    console.log('use effect');
    // if (!socket) {
    // setSocket(io());
    // } else {
    const addMessage = (msg: string, clientOffset: string) => {
      setMessages((curMessages) => curMessages.concat([{ msg, clientOffset }]));
      console.log('socket on called');
    };
    // // socket.on('connection', null);
    socket.on('sendMsg', addMessage);
    // }
    // return () => {
    //   socket.off('sendMsg', addMessage);
    // };
  }, [setMessage]);

  // needs socket
  const onSend = () => {
    // setMessages((curMessages) => curMessages.concat([message]));
    if (message) {
      const clientOffset = `${socket.id}-${(counter += 1)}`;
      socket.emit('msg', message, clientOffset);
    }
    setMessage('');
  };

  const onPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  const color = useColorModeValue('blue.600', 'blue.200');

  return (
    <Container>
      <Center>
        <Heading color={color}>Chat</Heading>
      </Center>
      <Box overflowY="auto" maxHeight="70vh" marginBottom="10px" marginTop="15px">
        <Stack divider={<StackDivider />}>
          {messages.map((msg, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text key={`${msg.clientOffset}-${index}`}>{msg.msg}</Text>
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
