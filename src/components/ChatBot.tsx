import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Heading,
  Center,
  StackDivider,
  Stack,
  Container,
  Text,
  useToast,
  Box,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { UserContext } from '../context/UserContext';

import Info from './BotComponents/Info';
import DeleteModal from './BotComponents/DeleteModal';
import ChatInput from './ChatComponents/ChatInput';

function ChatBot() {
  const toast = useToast();

  const userContext = useContext(UserContext);

  // was destructuring user, but caused a failure on refresh
  const { user, setUser } = userContext;

  const [message, setMessage] = useState('');

  const startState = [
    { role: 'system', content: 'You are an inquisitive friend to users who are grieving.' },
  ];

  const [messages, addMessage] = useState(startState);

  const [isWaiting, setWaiting] = useState(false);

  const messagesEndRef = useRef(null);

  const bottomScroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setMessage(value);
  };

  type OpenaiMessageType = {
    role: string;
    content: string;
  };

  type DbMessageType = {
    role: string;
    content: string;
    id: Number;
    userId: Number;
  };

  const botBg = useColorModeValue('lavender', 'purple.700');

  const botColor = useColorModeValue('purple', 'lavender');

  const color = useColorModeValue('blue.600', 'blue.200');

  // sends text to friend if message was flagged
  const sendText = () => {
    axios
      .post('/chatbot/text', { name: user.name, phone: user.emConNum })
      .then(() => {
        toast({ title: `Sent message to ${user.emConName}`, status: 'success', isClosable: true });
      })
      .catch((err) => {
        console.error('failed sending friend message', err);
        toast({
          title: `Failed sending message to ${user.emConName} at ${user.emConNum}`,
          status: 'error',
          isClosable: true,
        });
      });
  };

  const onSend = () => {
    setWaiting(true);
    const aiMessage = { role: 'user', content: message };

    // allMessages is so we can post before messages is done updating
    let allMessages: OpenaiMessageType[];

    // on first POST need to save the beginning of conversation
    if (messages.length === 2 || messages.length === 3) {
      allMessages = messages.concat(aiMessage);
      addMessage(allMessages);
      axios
        .post('/chatbot/db1', { userId: user.id, messages: allMessages })
        .catch((err) => console.error('failed posted initial messages to db', err));
    } else {
      allMessages = messages.concat([aiMessage]);
      addMessage(allMessages);
      axios
        .post('/chatbot/db', { message: aiMessage, userId: user.id })
        .catch((err) => console.error('failed posting new message', err));
    }

    axios
      .post('/chatbot', { messages: allMessages })
      .then((response) => {
        setWaiting(false);
        addMessage((curMessages) => curMessages.concat([response.data.message]));
        axios.post('/chatbot/db', { message: response.data.message, userId: user.id });
      })
      .then(() => axios.post('/chatbot/moderate', { message: aiMessage }))
      .then(({ data }) => {
        if (data && user.emConNum) {
          sendText();
        }
      })
      .catch((err) => console.error('failed sending new message', err));
    setMessage('');
  };

  // triggers send if return key is pressed
  const onPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  const onDelete = () => {
    axios
      .delete('/chatbot/convo', { data: { userId: user.id } })
      .then(() => axios.get('/chatbot/new'))
      .then(({ data }) => addMessage(startState.concat(data.message)))
      .catch((err) => console.error('failed deleting convo', err));
  };

  // sets state of signed in user
  useEffect(() => {
    axios
      .get('/user')
      .then(({ data }) => {
        if (typeof data === 'object') {
          setUser({ ...data });
        }
      })
      .catch((err: AxiosError) => console.error('failed finding user/chat', err));
  }, [setUser]);

  // finds user's previous convo or start new one
  useEffect(() => {
    if (user && !messages[1]) {
      axios
        .get('/chatbot/convo', { params: { userId: user.id } })
        .then(({ data }) => {
          if (data.length) {
            return addMessage(
              data.map((dbMessage: DbMessageType) => {
                const { role, content } = dbMessage;
                return { role, content };
              }),
            );
          }
          return axios.get('/chatbot/new').then((response: AxiosResponse) => {
            // this is running a second time before messages has been updated
            addMessage((curMessages) => {
              if (curMessages.length === 1) {
                return curMessages.concat(response.data.message);
              }
              return curMessages;
            });
          });
        })
        .catch((err) => console.error('Failed finding messages or starting new convo', err));
    }
  }, [user, messages]);

  // scrolls to the bottom of messages (newest messages)
  useEffect(() => {
    bottomScroll();
  }, [messages]);

  return (
    <>
      <Center>
        <Heading color={color}>
          Chat Bot
        </Heading>
      </Center>
      <Center>
        <Info />
      </Center>
      <Container>
        <DeleteModal onDelete={onDelete} />
        <Box overflowY="auto" maxHeight="70vh" marginBottom="10px" marginTop="15px">
          <Stack divider={<StackDivider />}>
            {messages.slice(1).map((text, index) => (
              <Text
                borderRadius="10px"
                background={text.role === 'assistant' ? botBg : 'blue.600'}
                p="10px"
                // eslint-disable-next-line react/no-array-index-key
                key={`${text.role}-${index}`}
                color={text.role === 'assistant' ? botColor : 'white'}
                textAlign={text.role === 'assistant' ? 'left' : 'right'}
                marginLeft={text.role === 'assistant' ? 0 : 'auto'}
                width="fit-content"
              >
                {text.content}
              </Text>
            ))}
            {isWaiting ? <Skeleton height="20px" /> : null}
            <ChatInput
              messagesEndRef={messagesEndRef}
              onChange={onChange}
              onPress={onPress}
              message={message}
              onSend={onSend}
              id="chat"
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export default ChatBot;
