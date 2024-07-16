import React from 'react';
import { Heading, Flex, Text } from '@chakra-ui/react';

function UserInfo({
  heading,
  editInput,
  editHeading,
  defaultInput,
  ifNoDefault,
}: {
  heading: string;
  editInput: (heading: string) => void;
  editHeading: string;
  defaultInput: string;
  ifNoDefault: string;
}) {
  return (
    <>
      <Heading size="xs" textTransform="uppercase">
        {heading}
      </Heading>
      <Flex>
        <Text
          pt="2"
          fontSize="sm"
          display="inline"
          onClick={() => {
            editInput(editHeading);
          }}
        >
          {defaultInput || ifNoDefault}
        </Text>
      </Flex>
    </>
  );
}

export default UserInfo;
