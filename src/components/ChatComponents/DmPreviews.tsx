import React from 'react';
import { Box, StackDivider, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { User } from '@prisma/client';

import { DmPreview } from '../../types/chat';

function DmPreviews({
  dmPreviews,
  select,
  onMouseHover,
  onMouseLeave,
  user,
}: {
  dmPreviews: DmPreview[];
  select: (
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
  user: User;
}) {
  const bgClr = useColorModeValue('whitesmoke', 'default');

  const shortenMsg: (msg: string) => string = (msg) => {
    let shortMsg: string;
    if (msg.length < 60) {
      shortMsg = msg;
    } else {
      shortMsg = `${msg.substring(0, msg.substring(0, 50).lastIndexOf(' '))}...`;
    }
    return shortMsg;
  };

  return (
    <VStack
      divider={<StackDivider />}
      backgroundColor={bgClr}
      alignItems="start"
      borderRadius=".4rem"
      mt=".4rem"
      p=".5rem"
    >
      {dmPreviews.length ? (
        dmPreviews.map((dm) => (
          <Box key={`${dm.senderId}-${dm.recipientId}`}>
            <Text
              id={`${dm.senderId}-${dm.recipientId}`}
              onMouseEnter={onMouseHover}
              onMouseLeave={onMouseLeave}
              onClick={select}
            >
              {`${
                dm.recipientId !== user.id
                  ? dm.recipient.preferredName || dm.recipient.name
                  : dm.sender.preferredName || dm.sender.name
              }: ${shortenMsg(dm.msg)}`}
            </Text>
          </Box>
        ))
      ) : (
        <Text>
          You have no DMs. Start a conversation by searching for a user and clicking their name!
        </Text>
      )}
    </VStack>
  );
}

export default DmPreviews;
