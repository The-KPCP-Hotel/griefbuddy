import React from 'react';
import { Text, useColorModeValue } from '@chakra-ui/react';

function Info() {
  const color = useColorModeValue('blue.600', 'blue.200');

  return (
    <Text fontWeight="bold" color={color} marginBottom="1rem" marginLeft="1rem" marginRight="1rem" textAlign="center">
      Welcome to the Chat Bot! Here you can get things off your chest or have any other private
      conversation you&apos;d like.
    </Text>
  );
}

export default Info;
