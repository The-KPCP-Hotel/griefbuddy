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

  const [userMessages, addUserMessage] = useState([] as string[]);

  const [start, addStart] = useState('');

  const [messages, addMessage] = useState([
    { role: 'system', content: 'You are an inquisitive friend to users who are grieving.' },
  ]);

  const onChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setMessage(value);
  };

  const onSend = () => {
    const newMessages = userMessages.slice();
    newMessages.push(message);
    addUserMessage(newMessages);
    const aiMessage = { role: 'user', content: message };
    // this if statement is because of strict mode added two initial messages
    if (messages[2].role === 'assistant') {
      addMessage((curMessages) => {
        const allMessages = curMessages
          .slice(0, 1)
          .concat(curMessages.slice(2))
          .concat([aiMessage]);
        axios
          .post('/chatbot', { messages: allMessages })
          .then((response) => console.log(response))
          .catch((err) => console.error('failed sending new message', err));
        // return curMessages.slice(0, 1).concat(curMessages.slice(2)).concat([aiMessage]);
        return [curMessages[0], curMessages[2], aiMessage];
      });
    } else {
      addMessage((curMessages) => curMessages.concat([aiMessage]));
    }
    // addMessage()
    setMessage('');
    // this is sending before messages has been updated
  };

  // type OpenaiMessageType = {
  //   role: string;
  //   content: string;
  // };

  // type OpenaiType = {
  //   index: Number;
  //   message: OpenaiMessageType;
  //   finish_reason: string;
  // };

  useEffect(() => {
    axios
      .get('/chatbot/new')
      .then((response: AxiosResponse) => {
        addStart(response.data.message.content);

        addMessage((curMessages) => curMessages.concat(response.data.message));
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
          {userMessages.map((text) => (
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
