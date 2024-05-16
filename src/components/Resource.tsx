import React from 'react';
import {
  ChakraProvider,
  Heading,
  Center,
  Box,
  ListItem,
  OrderedList,
  Container,
} from '@chakra-ui/react';

function Resource() {
  return (
    <ChakraProvider>
      <Center>
        <Heading size="3xl" color="blue.200" marginBottom="35px">
          Resource
        </Heading>
      </Center>
      <Container maxW="7xl">
        <Center>
          <Box
            h="550px"
            w="475px"
            bg="blue.200"
            padding="25px"
            borderRadius="15px"
            overflow="scroll"
          >
            <Center>
              <h2>Lorem Ipsum Resource</h2>
            </Center>
            <br />
            <OrderedList>
              <ListItem>Remedies:</ListItem>
              <br />
              <ListItem>Testimonials:</ListItem>
              <br />
              <ListItem>Link to Community</ListItem>
            </OrderedList>
          </Box>
        </Center>
      </Container>
    </ChakraProvider>
  );
}

export default Resource;
