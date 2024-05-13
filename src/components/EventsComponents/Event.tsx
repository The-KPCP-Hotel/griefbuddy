import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
  // stay new line
  Card,
  Center,
  Heading,
  Image,
  ChakraProvider,
  CardBody,
  Text,
  Link as ChakraLink,
  Container,
  Box,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon, ArrowBackIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import axios from 'axios';

import EventImage, { EventType, MediaRawItem } from './EventImage';

// import Breadcrumbs from '../NavComponents/Breadcrumbs';
// export type EventType = {
//   id: Number;
//   title: String;
//   media_raw: MediaRawItem[];
//   description: String;
//   address: String;
//   url: string;
//   startDate: String;
//   endDate: String;
//   nextDate: String;
//   recurrence: String;
// };

// export type MediaRawItem = {
//   mediaurl: string;
//   sortorder: Number;
// };

function Event() {
  const { id } = useParams();

  const [event, setEvent] = useState({} as EventType);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const { recurrence } = event;

  useEffect(() => {
    axios
      .get(`/events/event/${id}`)
      .then(({ data }) => {
        setEvent(data);
        setStart(dayjs(data.startDate).format('dddd, MMMM D, YYYY'));
        setEnd(dayjs(data.endDate).format('dddd, MMMM D, YYYY'));
      })
      .catch((err) => console.error('failed finding event', err));
  }, [id]);

  return (
    <ChakraProvider>
      <ChakraLink as={ReactRouterLink} to="/events" paddingLeft="10px">
        <ArrowBackIcon />
        Back to Local Happenings
      </ChakraLink>
      <Container maxW="7xl">
        <Box padding="10px">
          <Center>
            <Heading size="3xl" color="blue.200">
              {event.title}
            </Heading>
          </Center>
        </Box>
        <Card>
          <CardBody>
            <Text>{event.description}</Text>
            <Text>{event.address}</Text>
            <ChakraLink href={event.url} isExternal>
              More information on their site
              <ExternalLinkIcon mx="2px" />
            </ChakraLink>
            {start === end ? (
              <Text>{`Happening on ${start}`}</Text>
            ) : (
              <Text>{`Make sure to check it out between ${start} and ${end}`}</Text>
            )}
            {recurrence ? <Text>{recurrence}</Text> : null}
            <Wrap justify="center" spacing="30px">
              {event.media_raw
                ? event.media_raw.map((url: MediaRawItem) => (
                  <WrapItem key={`wi-${event.id}-${url.sortorder}`}>
                    <Center>
                      <Image
                        maxW="500px"
                        key={`${event.id}-${url.sortorder}`}
                        src={url.mediaurl}
                      />
                    </Center>
                  </WrapItem>
                ))
                : null}
            </Wrap>
          </CardBody>
        </Card>
      </Container>
    </ChakraProvider>
  );
}

export default Event;
