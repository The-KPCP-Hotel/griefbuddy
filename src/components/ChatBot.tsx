import React, { useState, useEffect } from 'react';
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

function ChatBot() {
  const [message, setMessage] = useState('');

  const [messages, addMessage] = useState([] as string[]);

  const [start, addStart] = useState('');

  const onChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setMessage(value);
  };

  const onSend = () => {
    const newMessages = messages.slice();
    newMessages.push(message);
    addMessage(newMessages);
    setMessage('');
  };

  type OpenaiMessageType = {
    role: string;
    content: string;
  };

  type OpenaiType = {
    index: Number;
    message: OpenaiMessageType;
    finish_reason: string;
  };

  useEffect(() => {
    axios
      .get('/chatbot/new')
      .then((response: AxiosResponse) => {
        console.log(response);
        addStart(response.data.message.content);
      })
      .catch((err: AxiosError) => console.error('failed starting chat', err));
  }, []);

  return (
    <ChakraProvider>
      <Center>
        <Heading size="3xl" color="blue.200">
          Chat Bot
        </Heading>
      </Center>
      <Container>
        <Stack divider={<StackDivider />}>
          <Text>{start}</Text>
          {messages.map((text) => (
            <Text>{text}</Text>
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
