import React from 'react';
import { HStack, Input, Button } from '@chakra-ui/react';

function UserSearchInput({
  onChange,
}: {
  onChange: (e: {
    target: {
      value: string;
      id: string;
    };
  }) => void;
}) {
  return (
    <HStack>
      <Input onChange={onChange} id="user" />
      <Button>Search User</Button>
    </HStack>
  );
}

export default UserSearchInput;
