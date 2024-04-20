import React = require('react');

import axios from 'axios';

import { useContext, useEffect } from 'react';
import { UserContext, AuthUser } from '../context/UserContext';
import { ChakraProvider } from '@chakra-ui/react';
import { Heading, Center, Container, Box } from '@chakra-ui/react';
import Quote from './HomeComponents/Quote';
import MainFeed from './MainFeed';

function HomePage() {
  const userContext = useContext(UserContext);

  const { setUser, user } = userContext;

  // want to find a better solution than calling db every time homepage is rendered
  useEffect(() => {
    axios
      .get('/user')
      .then(({ data }: { data: AuthUser }) => {
        if (typeof data === 'object') {
          const curUser = { ...data };
          setUser(curUser);
        }
      })
      // adding here because this response takes over a second
      // could move to app, but didn't want lag on events page
      .then(() => axios.get('/events/new'))
      .catch((err: Error) => console.error('failed setting user', err));
  }, [setUser]);

  return (
    <ChakraProvider>
      <Center>
            <Heading size='3xl' color={"blue.200"}>HomePage</Heading>
      </Center>
      <Container maxW="7xl"  >

      <h2>{`Welcome ${user?.name.split(' ')[0]}`}</h2>
      <Quote />
      <Box h="600px"  overflow="scroll">
        <MainFeed></MainFeed>
      </Box>
      </Container>
    </ChakraProvider>
  );
}

export default HomePage;
