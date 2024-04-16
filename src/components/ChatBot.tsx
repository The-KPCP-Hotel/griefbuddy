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

  // const [userMessages, addUserMessage] = useState([] as string[]);

  // const [start, addStart] = useState('');

  const [messages, addMessage] = useState([
    { role: 'system', content: 'You are an inquisitive friend to users who are grieving.' },
  ]);

  const onChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setMessage(value);
  };

  type OpenaiMessageType = {
    role: string;
    content: string;
  };

  const onSend = () => {
    // const newMessages = userMessages.slice();
    // newMessages.push(message);
    // addUserMessage((curUserMessages) => curUserMessages.concat([message]));
    const aiMessage = { role: 'user', content: message };

    // allMessages is so we can post before messages is done updating
    let allMessages: OpenaiMessageType[];
    // this if statement is because of strict mode added two initial messages
    if (messages[2].role === 'assistant') {
      allMessages = [messages[0], messages[2], aiMessage];
      addMessage(allMessages);
    } else {
      allMessages = messages.concat([aiMessage]);
      addMessage(allMessages);
    }
    // addMessage()
    axios
      .post('/chatbot', { messages: allMessages })
      .then((response) => {
        console.log(response.data.message.content);
        addMessage((curMessages) => curMessages.concat([response.data.message]));
      })
      .catch((err) => console.error('failed sending new message', err));
    setMessage('');
  };

  // type OpenaiType = {
  //   index: Number;
  //   message: OpenaiMessageType;
  //   finish_reason: string;
  // };

  useEffect(() => {
    axios
      .get('/chatbot/new')
      .then((response: AxiosResponse) => {
        // addStart(response.data.message.content);

        addMessage((curMessages) => curMessages.concat(response.data.message));
      })
      .catch((err: AxiosError) => console.error('failed starting chat', err));
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
          {messages.slice(1).map((text, index) => (
            // when using db will replace with db index
            // eslint-disable-next-line react/no-array-index-key
            <Text key={`${text.role}-${index}`} color={text.role === 'assistant' ? 'purple' : 'default'}>{text.content}</Text>
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
