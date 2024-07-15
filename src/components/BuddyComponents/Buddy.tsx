import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import { Socket } from 'socket.io-client';
import { Center, Container, Heading, Text, useColorModeValue, useToast, IconButton } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

import { Buddy as BuddyType, Dm } from '../../types/chat';
import DmStack from '../ChatComponents/DmStack';
import ChatInput from '../ChatComponents/ChatInput';

function Buddy({ socket }: { socket: Socket }) {
  const toast = useToast();

  const [userId, setUserId] = useState(null as number);

  const [showInfo, setShowInfo] = useState(false);

  const [buddy, setBuddy] = useState({} as BuddyType);

  const [dms, setDms] = useState([] as Dm[]);

  const [dm, setDm] = useState('');

  const [room, setRoom] = useState('');

  const messagesEndRef = useRef(null);

  const textareaRef = useRef();

  const bottomScroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(bottomScroll, [dms, textareaRef]);

  // sets state of signed in user - find buddy - join room - find dms
  useEffect(() => {
    axios
      .get('/buddy/get')
      .then(
        ({
          data: { buddy2, buddy1 },
        }: {
          data: { buddy1Id: number; buddy2: BuddyType; buddy1: { id: number; googleId: string } };
        }) => {
          setUserId(buddy1.id);
          setBuddy(buddy2);
          const roomName: string =
            buddy1.googleId < buddy2.googleId
              ? `${buddy1.googleId}-${buddy2.googleId}`
              : `${buddy2.googleId}-${buddy1.googleId}`;
          setRoom(roomName);
          socket.emit('room', roomName);
          return axios.get('/chat/dms', { params: { senderId: buddy1.id, recipientId: buddy2.id } });
        },
      )
      .then(({ data }: { data: Dm[] }) => setDms(data))
      .catch((err: AxiosError) => console.error('failed finding user/chat', err));
  }, [setBuddy, socket]);

  useEffect(() => {
    const addDm = (msg: string, senderId: number, recipientId: number) => {
      setDms((curDms) => curDms.concat([{ msg, senderId, recipientId }]));
    };
    socket.on('sendDm', addDm);
  }, [setDms, socket]);

  const onChange = (e: { target: { value: string } }) => setDm(e.target.value);

  const onSend = () => {
    if (dm) {
      // moderates dms - does add a slight lag to msg send
      axios.post('chatbot/moderate', { message: { content: dm } }).then(({ data }) => {
        if (!data && room) {
          socket.emit('dm', dm, room, userId, buddy.id);
        } else if (data) {
          toast({
            title: 'Flagged message.',
            description: 'Your message was flagged for inappropriate content and will not send.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      });
    }
    setDm('');
    const textarea = document.getElementById('buddy');
    textarea.style.height = '2.5rem';
    textarea.style.maxHeight = 'inherit';
  };

  const onPress = (
    e: React.KeyboardEvent<HTMLInputElement> & {
      target: React.ButtonHTMLAttributes<HTMLButtonElement>;
    },
  ) => {
    if (e.key === 'Enter') {
      onSend();
    }
  };

  const color = useColorModeValue('blue.600', 'blue.200');
  return (
    <Container>
      <Center>
        <Heading color={color}>Buddy Chat</Heading>
        <IconButton aria-label="Toggle info" variant="ghost" as={InfoIcon} p=".25rem" ml=".5rem" color={color} boxSize={7} onClick={() => setShowInfo((cur) => !cur)} />
      </Center>
      {showInfo ? (
        <Text textAlign="center" color={color} fontWeight="bold">
          Welcome to the Beta Buddy Chat. You&apos;ll be temporarily paired with another user, and
          you&apos;re encouraged to give extra support to one another while making a new friend or
          strengthening a connection.
        </Text>
      ) : null}
      <Text textAlign="center" color={color} fontWeight="bold" mt=".5rem">
        Your current buddy is:
      </Text>
      <Center>
        <Heading size="lg" as="h3" color={color}>
          {buddy?.preferredName || buddy?.name}
        </Heading>
      </Center>
      <DmStack dms={dms} id={userId} />
      <ChatInput
        id="buddy"
        message={dm}
        messagesEndRef={messagesEndRef}
        textareaRef={textareaRef}
        onChange={onChange}
        onPress={onPress}
        onSend={onSend}
      />
    </Container>
  );
}

export default Buddy;
