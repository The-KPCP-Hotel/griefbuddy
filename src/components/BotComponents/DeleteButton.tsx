import React from 'react';
import { Button } from '@chakra-ui/react';

function DeleteButton({ onDelete }: { onDelete: () => void }) {
  return (
    <Button bg="red" color="white" onClick={onDelete}>
      Delete Conversation
    </Button>
  );
}

export default DeleteButton;
