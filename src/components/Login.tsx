import React from 'react';
import { Button, ChakraProvider, Heading, Center, Image } from '@chakra-ui/react';

function Login() {
  return (
    <ChakraProvider>
      <Center>
        <Heading size="3xl" color="blue.600">GriefBuddy</Heading>
      </Center>
      <Center m="20px">
        <form action="/auth/google" method="GET">
          <Button
            type="submit"
            rightIcon={(
              <Image
                padding="5px"
                width="40px"
                src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
              />
            )}
          >
            Sign in with Google
          </Button>
        </form>
      </Center>
    </ChakraProvider>
  );
}

export default Login;
