import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
  Card,
  Center,
  Heading,
  CardBody,
  Text,
  Link as ChakraLink,
  Container,
  Box,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon, ArrowBackIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import axios from 'axios';

import EventImage, { EventType, MediaRawItem } from './EventImage';

function Event() {
  const { id } = useParams();

  const [event, setEvent] = useState({} as EventType);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { recurrence, title, description, address, media_raw } = event;

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const color = useColorModeValue('blue.600', 'blue.200');

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
    <>
      <ChakraLink as={ReactRouterLink} to="/events" paddingLeft="10px">
        <ArrowBackIcon />
        Back to Local Happenings
      </ChakraLink>
      <Container maxW="7xl">
        <Box padding="10px">
          <Center>
            <Heading color={color}>
              {title}
            </Heading>
          </Center>
        </Box>
        <Card>
          <CardBody>
            <Text>{description}</Text>
            <Text>{address}</Text>
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
              {media_raw ? (
                media_raw.map((url: MediaRawItem) => (
                  <WrapItem key={`wi-${id}-${url.sortorder}`}>
                    <Center>
                      <EventImage key={`ev-${id}-${url.sortorder}`} url={url} />
                    </Center>
                  </WrapItem>
                ))
              ) : (
                <WrapItem key={`wi-${id}-default`}>
                  <Center>
                    <EventImage
                      url={{
                        mediaurl:
                          'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_72,q_75,w_123/v1/clients/neworleans/NewOrleansLogo_Website_Dark_Grey_1a1a1a_123px_3c60c0e3-35b0-4efb-9685-d2f5ac92528a.jpg',
                        sortorder: 1,
                      }}
                    />
                  </Center>
                </WrapItem>
              )}
            </Wrap>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default Event;
