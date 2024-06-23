import React from 'react';
import { Box, StackDivider, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { DmPreview } from '../../types/chat';

function DmPreviews({
  dmPreviews,
  select,
  onMouseHover,
  onMouseLeave,
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
      {dmPreviews.map((dm) => (
        <Box key={`${dm.senderId}-${dm.recipientId}`}>
          <Text
            id={`${dm.senderId}-${dm.recipientId}`}
            onMouseEnter={onMouseHover}
            onMouseLeave={onMouseLeave}
            onClick={select}
          >
            {`${dm.recipient.preferredName || dm.recipient.name}: ${shortenMsg(dm.msg)}`}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}

export default DmPreviews;
