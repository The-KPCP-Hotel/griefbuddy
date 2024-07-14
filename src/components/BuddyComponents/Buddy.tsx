import React from 'react';
import { Center, Container, Heading, Text, useColorModeValue } from '@chakra-ui/react';
// will eventually need socket, but not there yet
// import { Socket } from 'socket.io';

function Buddy() {
  // function Buddy({ socket }: { socket: Socket }) {

  const color = useColorModeValue('blue.600', 'blue.200');
  return (
    <Container>
      <Center>
        <Heading color={color}>Buddy</Heading>
      </Center>
      <Text textAlign="center" color={color} fontWeight="bold">
        This is the Beta Buddy chat. You&apos;ll be temporarily paired with another user, and
        you&apos;re encouraged to give extra support to one another while making new buddies.
      </Text>
    </Container>
  );
}

export default Buddy;
