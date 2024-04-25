import React from 'react';

import { Box, Heading, Input } from '@chakra-ui/react';

interface Props {
  setNumber: Function;
}

// const defaultProps: Props = {
//   setNumber: () => {},
// };

function PhoneInput({ setNumber }: Props) {
  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        Phone Number
      </Heading>

      <Input
        type="text"
        onChange={(e) => {
          const num = e.target.value;
          setNumber(num);
        }}
      />
    </Box>
  );
}

// PhoneInput.defaultProps = defaultProps;

export default PhoneInput;
