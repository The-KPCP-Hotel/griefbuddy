import React from 'react';
import { Button } from '@chakra-ui/react';

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <Button bg="red" color="white" onClick={onClick}>
      Delete Conversation
    </Button>
  );
}

export default DeleteButton;
