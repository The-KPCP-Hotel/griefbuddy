import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, Center, Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

function EventListItem({
  event,
  eventFocus,
}: {
  event: { title: String; description: String; media_raw: any[]; id: Number; OgId: string };
  eventFocus: string;
}) {
  const {
    title,
    description,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    media_raw,
    id,
    OgId,
  } = event;

  const [boxShadow, setBoxShadow] = useState('base');

  useEffect(() => {
    if (eventFocus === OgId) {
      setBoxShadow('dark-lg');
    } else {
      setBoxShadow('base');
    }
  }, [eventFocus, OgId]);

  return (
    <Box
      id={event.OgId}
      boxSize="320px"
      p="10px"
      boxShadow={boxShadow}
      borderRadius="md"
      background="blue.200"
    >
      <Center>
        <ChakraLink as={ReactRouterLink} to={`/events/${id}`}>
          <Heading size="sm">{title}</Heading>
        </ChakraLink>
      </Center>
      <Center>
        <Text pt="2" fontSize="sm">
          {description}
        </Text>
      </Center>
      {media_raw ? (
        <Center>
          <Image boxSize="200px" fit="contain" src={media_raw[0].mediaurl} />
        </Center>
      ) : (
        <div />
      )}
    </Box>
  );
}

export default EventListItem;
