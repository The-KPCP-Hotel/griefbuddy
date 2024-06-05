import React from 'react';
import { Button } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';

function Logout() {
  return (
    <form action="/logout" method="POST">
      <Button type="submit" pr=".75rem" pl=".75rem">
        <LockIcon mr=".5rem" />
        Logout
      </Button>
    </form>
  );
}

export default Logout;
