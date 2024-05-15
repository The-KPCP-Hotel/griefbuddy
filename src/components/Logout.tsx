import React from 'react';
import { Button } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';

function Logout() {
  return (
    <form action="/logout" method="POST">
      <Button type="submit">
        <LockIcon />
        Logout
        {' '}
      </Button>
    </form>
  );
}

export default Logout;
