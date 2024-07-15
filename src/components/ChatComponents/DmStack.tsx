import React from 'react';
import { Stack, Text, useColorModeValue } from '@chakra-ui/react';

import { Dm } from '../../types/chat';

function DmStack({ dms, id }: { dms: Dm[]; id: number }) {
  const otherUserBG = useColorModeValue('lavender', 'purple.700');

  const otherUserColor = useColorModeValue('purple', 'lavender');
  return (
    <Stack margin="8px">
      {dms.map((msg, index) => (
        <Text
          // eslint-disable-next-line react/no-array-index-key
          key={`${msg.senderId}-${index}`}
          borderRadius="10px"
          background={msg.senderId === id ? 'blue.600' : otherUserBG}
          p="10px"
          color={msg.senderId === id ? 'white' : otherUserColor}
          textAlign={msg.senderId === id ? 'right' : 'left'}
          marginLeft={msg.senderId === id ? 'auto' : 0}
          width="fit-content"
        >
          {msg.msg}
        </Text>
      ))}
    </Stack>
  );
}
export default DmStack;
