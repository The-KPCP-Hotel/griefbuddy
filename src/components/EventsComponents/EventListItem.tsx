import React from 'react';
import {
  Box, Heading, Text, Image, Center,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function EventListItem({
  event,
}: {
  event: { title: String; description: String; media_raw: any[], id: Number };
}) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    title, description, media_raw, id,
  } = event;
  return (
    <Box boxSize="250px" borderRadius="med">
      {/* <li>{title}</li> */}
      <Center>
        <Link to={`/events/${id}`}>
          <Heading size="sm">{title}</Heading>
        </Link>
      </Center>
      {(media_raw) ? (
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
