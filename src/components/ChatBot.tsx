import React, { useState } from 'react';
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

function ChatBot() {
  const [message, setMessage] = useState('');

  const [messages, addMessage] = useState([] as string[]);

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

  return (
    <ChakraProvider>
      <Center>
        <Heading size="3xl" color="blue.200">
          Chat Bot
        </Heading>
      </Center>
      <Container>
        <Stack divider={<StackDivider />}>
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
