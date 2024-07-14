import { Container, Heading, Text } from '@chakra-ui/react';
import React from 'react';
// will eventually need socket, but not there yet
// import { Socket } from 'socket.io';

function Buddy() {
// function Buddy({ socket }: { socket: Socket }) {
  return (
    <Container>
      <Heading>Buddy</Heading>
      <Text>
        This is the Beta Buddy chat. You&apos;ll be temporarily paired with another user, and
        you&apos;re encouraged to give extra support to one another while making new buddies.
      </Text>
    </Container>
  );
}

export default Buddy;
