import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import { ChakraProvider, Heading, Container, Box } from '@chakra-ui/react';
import { UserContext, AuthUser } from '../context/UserContext';
import Quote from './HomeComponents/Quote';
import MainFeed from './MainFeed';

function HomePage() {
  const userContext = useContext(UserContext);

  const { setUser, user } = userContext;
  const [googId, setGoogId] = useState('');
  // want to find a better solution than calling db every time homepage is rendered
  useEffect(() => {
    axios
      .get('/user')
      .then(({ data }: { data: AuthUser }) => {
        if (typeof data === 'object') {
          const curUser = { ...data };
          setUser(curUser);
          setGoogId(curUser.googleId);
        }
      })
      // adding here because this response takes over a second
      // could move to app, but didn't want lag on events page
      .then(() => axios.get('/events/new'))
      .catch((err: Error) => console.error('failed setting user', err));
  }, [setUser]);

  return (
    <ChakraProvider>
      {/* <Center>
        <Heading
          size="3xl"
          color="blue.200"
          onClick={() => {
            console.log(googId);
          }}
        >
          HomePage
        </Heading>
      </Center> */}
      <Container maxW="7xl">
        <Heading color="blue.600" size="lg">{`Welcome ${user?.name.split(' ')[0]}`}</Heading>
        <Quote />
        <Box h="600px" overflow="scroll">
          <MainFeed user={user} googleId={googId} />
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default HomePage;
