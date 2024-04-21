import React = require('react');
import { Button, ChakraProvider, Heading } from '@chakra-ui/react';

function Login() {
  return (
    <ChakraProvider>
      <Heading>Google Login</Heading>
      <form action="/auth/google" method="GET">
        <Button type="submit">GOOGLE BUTTON</Button>
      </form>
    </ChakraProvider>
  );
}

export default Login;
