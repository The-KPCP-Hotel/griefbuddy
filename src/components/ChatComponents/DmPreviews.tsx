import React from 'react';
import { Box, StackDivider, Text, VStack } from '@chakra-ui/react';
import { DmPreview } from '../../types/chat';

function DmPreviews({ dmPreviews }: { dmPreviews: DmPreview[] }) {
  const shortenMsg: (msg: string) => string = (msg) => {
    let shortMsg: string;
    if (msg.length < 60) {
      shortMsg = msg;
    } else {
      shortMsg = `${msg.substring(0, msg.substring(0, 50).lastIndexOf(' '))}...`;
    }
    return shortMsg;
  };

  const onMouseHover = (e) => {
    e.target.style.textDecoration = 'underline';
  };

  const onMouseLeave = (e) => {
    e.target.style.textDecoration = 'none';
  };

  return (
    <VStack divider={<StackDivider />} backgroundColor="whitesmoke" alignItems="start" borderRadius=".4rem" mt=".4rem" p=".5rem">
      {dmPreviews.map((dm) => (
        <Box key={`${dm.senderId}-${dm.recipientId}`}>
          <Text id={`text-${dm.senderId}-${dm.recipientId}`} onMouseEnter={onMouseHover} onMouseLeave={onMouseLeave}>{`${dm.recipient.preferredName || dm.recipient.name}: ${shortenMsg(dm.msg)}`}</Text>
        </Box>
      ))}
    </VStack>
  );
}

export default DmPreviews;
