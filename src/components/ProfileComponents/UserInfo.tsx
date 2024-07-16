import React from 'react';
import { Heading, Flex, Text } from '@chakra-ui/react';

function UserInfo({
  heading,
  editInput,
  editHeading,
  defaultInput,
  ifNoDefault,
}: {
  heading: String;
  editInput: (heading: String) => void;
  editHeading: string;
  defaultInput: String;
  ifNoDefault: String;
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
