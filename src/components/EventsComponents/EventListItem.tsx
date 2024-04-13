import React from 'react';
import {
  Box, Heading, Text, Image, Center,
} from '@chakra-ui/react';

function EventListItem({
  event,
}: {
  event: { title: String; description: String; media_raw: any[] };
}) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, description, media_raw } = event;
  return (
    <Box boxSize="250px" borderRadius="med">
      {/* <li>{title}</li> */}
      <Center>
        <Heading size="sm">{title}</Heading>
      </Center>
      {media_raw.length ? (
        <Center><Image boxSize="200px" fit="contain" src={media_raw[0].mediaurl} /></Center>
      ) : (
        <div />
      )}
      <Center>
        <Text pt="2" fontSize="sm">
          {description}
        </Text>
      </Center>
    </Box>
  );
}

export default EventListItem;
