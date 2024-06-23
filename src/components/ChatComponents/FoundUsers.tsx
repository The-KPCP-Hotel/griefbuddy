import { StackDivider, VStack, useColorModeValue, Text } from '@chakra-ui/react';
import React from 'react';
import { User } from '@prisma/client';

function FoundUsers({
  foundUsers,
  userSelect,
  onMouseHover,
  onMouseLeave,
}: {
  foundUsers: User[];
  userSelect: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent> & {
      target: React.ButtonHTMLAttributes<HTMLButtonElement>;
    },
  ) => void;
  onMouseHover: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent> & {
      target: React.ButtonHTMLAttributes<HTMLButtonElement>;
    },
  ) => void;
  onMouseLeave: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent> & {
      target: React.ButtonHTMLAttributes<HTMLButtonElement>;
    },
  ) => void;
}) {
  const bgClr = useColorModeValue('whitesmoke', 'default');

  return foundUsers.length ? (
    <VStack divider={<StackDivider />} backgroundColor={bgClr} alignItems="start" p=".5rem">
      {foundUsers.map((foundUser) => (
        <Text onClick={userSelect} onMouseEnter={onMouseHover} onMouseLeave={onMouseLeave} key={foundUser.googleId} id={`${foundUser.id}`}>
          {foundUser.preferredName || foundUser.name}
        </Text>
      ))}
    </VStack>
  ) : null;
}

export default FoundUsers;
