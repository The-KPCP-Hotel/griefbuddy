import React, { useRef, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
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

const socket: Socket = io();

function Chat() {
  interface Message {
    msg: string;
    clientOffset: string;
  }
  type Dm = {
    msg: string;
    // userId: number;
    // sendId: number;
    senderId: number;
    recipientId: number;
  };

  const [user, setUser] = useState({} as User);

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([] as Message[]);

  const [userSearch, setUserSearch] = useState('');

  const [foundUsers, setFoundUsers] = useState([] as User[]);

  const [tabIndex, setTabIndex] = useState(0);

  const [dm, setDm] = useState('');

  const [dms, setDms] = useState([] as Dm[]);

  const [room, setRoom] = useState('');

  const [selectedUser, setSelectedUser] = useState({} as User);

  const messagesEndRef = useRef(null);

  const bottomScroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(bottomScroll, [messages]);

  useEffect(() => {
    axios.get('/user').then((response) => setUser(response.data));
  });

  useEffect(() => {
    axios.get('/chat/dms', { params: { senderId: user.id, recipientId: selectedUser.id } })
    // data is currently empty
      .then((dmResponse) => setDms(dmResponse.data))
      .catch((err) => console.error('Failed finding existing messages: ', err));
  }, [selectedUser.id, user.id]);

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
      case 'dm':
        setDm(value);
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
    // socket.off('sendMsg');
  }, [setMessages]);

  const onSendDm = () => {
    if (dm && room) {
      // want to emit by user id and not socket id
      // socket.emit('dm', dm, room, socket.id);
      socket.emit('dm', dm, room, user.id, selectedUser.id);
    }
    setDm('');
  };

  useEffect(() => {
    // const addDm = (msg: string, clientOffset: string) => {
    const addDm = (msg: string, senderId: number, recipientId: number) => {
      console.log(msg);
      // setDms((curDms) => curDms.concat([{ msg, clientOffset }]));
      setDms((curDms) => curDms.concat([{ msg, senderId, recipientId }]));
    };
    socket.on('sendDm', addDm);
  }, [setDms]);

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
      .get('/chat/userSearch', { params: { userSearch } })
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
    if (key === 'Enter') {
      if (id === 'chat') {
        onSend();
      } else if (id === 'user') {
        onSearch();
      } else if (id === 'dm') {
        onSendDm();
      }
    }
  };

  const userSelect = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent> & {
      target: React.ButtonHTMLAttributes<HTMLButtonElement>;
    },
  ) => {
    setTabIndex(1);
    axios.get('/chat/user', { params: { id: e.target.id } }).then((userResponse) => {
      setSelectedUser(userResponse.data);
      // console.log(user.googleId, userResponse.data.googleId);
      const roomName: string =
        user.googleId < userResponse.data.googleId
          ? `${user.googleId}-${userResponse.data.googleId}`
          : `${userResponse.data.googleId}-${user.googleId}`;
      setRoom(roomName);
      socket.emit('room', roomName);
    });
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
      {foundUsers.map((foundUser) => (
        <Text onClick={userSelect} key={foundUser.googleId} id={`${foundUser.id}`}>
          {foundUser.preferredName || foundUser.name}
        </Text>
      ))}
      <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
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
                id="chat"
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <Center>
              <Text>{selectedUser.preferredName || selectedUser.name}</Text>
            </Center>
            <Stack divider={<StackDivider />} margin="8px">
              {dms.map((msg, index) => (
                <Text
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${msg.senderId}-${index}`}
                  borderRadius="10px"
                  background={msg.senderId === user.id ? 'blue.600' : otherUserBG}
                  p="10px"
                  color={msg.senderId === user.id ? 'white' : otherUserColor}
                  textAlign={msg.senderId === user.id ? 'right' : 'left'}
                  marginLeft={msg.senderId === user.id ? 'auto' : 0}
                  width="fit-content"
                >
                  {msg.msg}
                </Text>
              ))}
            </Stack>
            <ChatInput
              messagesEndRef={messagesEndRef}
              message={dm}
              onChange={onChange}
              onSend={onSendDm}
              onPress={onPress}
              id="dm"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default Chat;
