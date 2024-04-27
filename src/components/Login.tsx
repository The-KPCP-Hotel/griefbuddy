import React from 'react';
import { Button, ChakraProvider, Heading, Center } from '@chakra-ui/react';

function Login() {
  return (
    <ChakraProvider>
      <Center>
        <Heading>Google Login</Heading>
      </Center>
      <Center>
        <form action="/auth/google" method="GET">
          <Button type="submit">GOOGLE BUTTON</Button>
        </form>
      </Center>
    </ChakraProvider>
  );
}

export default Login;
