import React from 'react';
import { HStack, Input, Button } from '@chakra-ui/react';

function UserSearchInput({
  onChange,
  onSearch,
}: {
  onChange: (e: {
    target: {
      value: string;
      id: string;
    };
  }) => void;
  onSearch: () => Promise<void>;
}) {
  return (
    <HStack>
      <Input onChange={onChange} id="user" />
      <Button onClick={onSearch}>Search User</Button>
    </HStack>
  );
}

export default UserSearchInput;
