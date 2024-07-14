import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
// import { User } from '@prisma/client';
import { Center, Container, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

import { Buddy as BuddyType, Dm } from '../../types/chat';
import DmStack from '../ChatComponents/DmStack';
// will eventually need socket, but not there yet
// import { Socket } from 'socket.io';

function Buddy() {
  // function Buddy({ socket }: { socket: Socket }) {
  const [userId, setUserId] = useState(null as number);

  const [showInfo, setShowInfo] = useState(false);

  const [buddy, setBuddy] = useState({} as BuddyType);

  const [dms, setDms] = useState([] as Dm[]);

  // sets state of signed in user
  useEffect(() => {
    axios
      .get('/buddy/get')
      .then(({ data: { buddy1Id, buddy2 } }: { data: { buddy1Id: number; buddy2: BuddyType } }) => {
        setUserId(buddy1Id);
        setBuddy(buddy2);
        return axios.get('/chat/dms', { params: { senderId: buddy1Id, recipientId: buddy2.id } });
      })
      .then(({ data }: { data: Dm[] }) => setDms(data))
      .catch((err: AxiosError) => console.error('failed finding user/chat', err));
  }, [setBuddy]);

  const color = useColorModeValue('blue.600', 'blue.200');
  return (
    <Container>
      <Center>
        <Heading color={color}>Buddy Chat</Heading>
        <InfoIcon pl=".5rem" color={color} boxSize={7} onClick={() => setShowInfo((cur) => !cur)} />
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
    </Container>
  );
}

export default Buddy;
