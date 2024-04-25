import React, { useId } from 'react';

import { Box, Heading, Input, Text } from '@chakra-ui/react';

interface Props {
  setNumber: Function;
}

function PhoneInput({ setNumber }: Props) {
  const phoneHintId = useId();
  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        Phone Number
      </Heading>

      <Input
        aria-describedby={phoneHintId}
        type="text"
        onChange={(e) => {
          const num = e.target.value;
          setNumber(num);
        }}
      />
      <Text id={phoneHintId}>Number should include area code</Text>
    </Box>
  );
}

export default PhoneInput;
