import React, { useState, useEffect, useContext } from 'react';
import {
  ChakraProvider,
  Heading,
  Center,
  StackDivider,
  Input,
  Stack,
  Container,
  Text,
  Button,
  HStack,
} from '@chakra-ui/react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { UserContext } from '../context/UserContext';

function ChatBot() {
  const userContext = useContext(UserContext);

  const { id } = userContext.user;

  const [message, setMessage] = useState('');

  const startState = [
    { role: 'system', content: 'You are an inquisitive friend to users who are grieving.' },
  ];

  const [messages, addMessage] = useState(startState);

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

  const onSend = () => {
    const aiMessage = { role: 'user', content: message };

    // allMessages is so we can post before messages is done updating
    let allMessages: OpenaiMessageType[];

    // this if statement is because strict mode added two initial messages
    if (messages.length === 2 || messages.length === 3) {
      // allMessages = [messages[0], messages[2], aiMessage];
      allMessages = messages.concat(aiMessage);
      addMessage(allMessages);
      axios
        .post('/chatbot/db1', { userId: id, messages: allMessages })
        .catch((err) => console.error('failed posted initial messages to db', err));
    } else {
      allMessages = messages.concat([aiMessage]);
      addMessage(allMessages);
      axios.post('/chatbot/db', { message: aiMessage, userId: id }).catch((err) => console.error('failed posting new message', err));
    }

    axios
      .post('/chatbot', { messages: allMessages })
      .then((response) => {
        addMessage((curMessages) => curMessages.concat([response.data.message]));
        axios.post('/chatbot/db', { message: response.data.message, userId: id });
      })
      .catch((err) => console.error('failed sending new message', err));
    setMessage('');
  };

  const onDelete = () => {
    axios
      .delete('/chatbot/convo', { data: { userId: id } })
      .then(() => axios.get('/chatbot/new'))
      .then(({ data }) => addMessage(startState.concat(data.message)))
      .catch((err) => console.error('failed deleting convo', err));
  };

  useEffect(() => {
    axios
      .get('/chatbot/convo')
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
          // strick mode causes two new messages to render
          // - the first is deleted on the first user response
          addMessage((curMessages) => curMessages.concat(response.data.message));
        });
      })
      .catch((err: AxiosError) => console.error('failed finding chat', err));
  }, []);

  return (
    <ChakraProvider>
      <Center>
        <Heading paddingBottom="15px" size="3xl" color="blue.200">
          Chat Bot
        </Heading>
      </Center>
      <Container>
        <Stack divider={<StackDivider />}>
          <Button onClick={onDelete}>Delete Conversation</Button>
          {messages.slice(1).map((text, index) => (
            <Text
              // eslint-disable-next-line react/no-array-index-key
              key={`${text.role}-${index}`}
              color={text.role === 'assistant' ? 'purple' : 'default'}
            >
              {text.content}
            </Text>
          ))}
          <HStack>
            <Input onChange={onChange} value={message} />
            <Button onClick={onSend}>Send</Button>
          </HStack>
        </Stack>
      </Container>
    </ChakraProvider>
  );
}

export default ChatBot;
