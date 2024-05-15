import React from 'react';

// import { useLocation } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import Navbar from './Navbar';

function NavBarContainer() {
  return (
    <ChakraProvider>
      <Container maxW="7xl" bg="blue.200" marginTop="0px" marginBottom="15px" h="125px">
        {/* {useLocation().pathname === '/' ? <div /> : <Navbar />} */}
        <Navbar />
      </Container>
    </ChakraProvider>
  );
}

export default NavBarContainer;
