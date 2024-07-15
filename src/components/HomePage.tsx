import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import { Heading, Container, Box, Divider } from '@chakra-ui/react';
import { UserContext, AuthUser } from '../context/UserContext';
import Quote from './HomeComponents/Quote';
import MainFeed from './HomeComponents/MainFeed';

function HomePage() {
  const userContext = useContext(UserContext);

  const { setUser, user } = userContext;
  const [googId, setGoogId] = useState('');
  const [userPic, setUserPic] = useState('');
  // want to find a better solution than calling db every time homepage is rendered
  useEffect(() => {
    axios
      .get('/user')
      .then(({ data }: { data: AuthUser }) => {
        if (typeof data === 'object') {
          const curUser = { ...data };
          setUser(curUser);
          setGoogId(curUser.googleId);
          setUserPic(curUser.userPicture)
        }
      })
      // adding here because this response takes over a second
      // could move to app, but didn't want lag on events page
      .then(() => axios.get('/events/new'))
      .catch((err: Error) => console.error('failed setting user', err));
  }, [setUser]);

  return (
    <Container maxW="100%" minW="100%">
      <Heading color="blue.600" size="lg">
        {`Welcome ${
          user?.name.split(' ')[0]
        }`}
      </Heading>
      <Quote userId={user?.id} />
      <Divider orientation="horizontal" />
      <Box h="600px" overflow="scroll">
        <MainFeed user={user} googleId={googId} userProfilePic={userPic}/>
      </Box>
    </Container>
  );
}

export default HomePage;
