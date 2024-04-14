import React from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

function Event() {
  return (
    <ChakraProvider>
      <Link to="/home" style={{ fontSize: '55px' }}>
        ⌂
      </Link>
    </ChakraProvider>
  );
}

export default Event;
