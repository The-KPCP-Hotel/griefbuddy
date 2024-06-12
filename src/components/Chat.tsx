import React, { useRef, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import {
  Box,
  Center,
  Container,
  Heading,
  Stack,
  StackDivider,
  useColorModeValue,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import { User } from '@prisma/client';

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

  const [userSearch, setUserSearch] = useState('');

  const [foundUsers, setFoundUsers] = useState([] as User[]);

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
        setUserSearch(value);
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

  const onSearch = async () => {
    axios
      .get('/chat/user', { params: { userSearch } })
      .then((usersResponse) => setFoundUsers(usersResponse.data));
    setUserSearch('');
  };

  const onPress = (
    e: React.KeyboardEvent<HTMLInputElement> & {
      target: React.ButtonHTMLAttributes<HTMLButtonElement>;
    },
  ) => {
    const { id } = e.target;
    const { key } = e;
    if (key === 'Enter' && id === 'chat') {
      onSend();
    } else if (key === 'Enter' && id === 'user') {
      onSearch();
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
      <UserSearchInput
        userSearch={userSearch}
        onChange={onChange}
        onSearch={onSearch}
        onPress={onPress}
      />
      {foundUsers.map((user) => (
        <Text key={user.googleId}>{user.name}</Text>
      ))}
      <Tabs>
        <TabList>
          <Tab>Main</Tab>
          <Tab>DMs</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Center>
              <Text>
                This is currently a chat with between you and anyone else logged on the chat!
              </Text>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default Chat;
