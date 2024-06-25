import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Heading,
  Center,
  Card,
  CardHeader,
  CardBody,
  Stack,
  VStack,
  Box,
  SimpleGrid,
  Wrap,
  WrapItem,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';

import EventListItem from './EventsComponents/EventListItem';
import EventsBigCalendar from './EventsComponents/EventsCalendar';

function Events() {
  const [events, setEvents] = useState([]);
  const [eventsToday, setEventsToday] = useState([]);

  const [eventFocus, setEventFocus] = useState('');

  function scrollToEvent(ogId: string) {
    const eventNode = document.getElementById(ogId);

    eventNode.scrollIntoView({
      behavior: 'smooth',
      // block: 'nearest',
      block: 'center',
      inline: 'center',
    });
  }

  useEffect(() => {
    if (eventFocus) {
      scrollToEvent(eventFocus);
    }
  }, [eventFocus]);

  useEffect(() => {
    axios
      .get('/events/all')
      .then(({ data }) => {
        setEvents(data);
        const today = new Date().toISOString();
        const curEvents = data.filter(
          (event: { startDate: String }) => event.startDate.slice(0, 10) === today.slice(0, 10),
        );
        setEventsToday(curEvents);
      })
      .catch();
  }, []);

  const color = useColorModeValue('blue.600', 'blue.200');

  return (
    <>
      {/* unsure about placement; was inside VStack box */}
      <Text as="h2" pl="16px" fontWeight="bold" color={color}>
        Need something to lift your spirits?
      </Text>
      <Text as="h2" pl="16px" fontWeight="bold" color={color}>
        Check out events happening in New Orleans!
      </Text>
      <VStack spacing="4" maxW="100%">
        <Box>
          {/* <Center> */}
          {/* </Center> */}
        </Box>
        <Box maxW="100%" justifyContent="inherit" p="10px">
          <Card>
            <Stack>
              <EventsBigCalendar setEventFocus={setEventFocus} events={events} />
            </Stack>
          </Card>
        </Box>
        {eventsToday.length ? (
          <Box className="eventsToday">
            <Card>
              <CardHeader>
                <Heading size="md">Events Starting Today</Heading>
              </CardHeader>
              <CardBody>
                <Wrap spacingY="40px" spacingX="80px" justify="center">
                  {eventsToday.map((event) => (
                    <WrapItem key={`wi-${event.OgId}`}>
                      <Center>
                        <EventListItem key={event.OgId} event={event} eventFocus="" />
                      </Center>
                    </WrapItem>
                  ))}
                  {/* this is for testing tons of events */}
                  {/* {events.map((event) => (
                  <EventListItem key={event.OgId} event={event} />
                ))} */}
                  {/* this is just to force grid to only have one card */}
                  {/* {events.length ? (
                  <WrapItem>
                    <Center>
                      <EventListItem event={events[0]} />
                    </Center>
                  </WrapItem>
                ) : null} */}
                </Wrap>
              </CardBody>
            </Card>
          </Box>
        ) : null}
        <Box>
          <Card>
            <Stack>
              <CardHeader>
                <Heading as="h3" size="md">
                  All Events
                </Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid
                  className="simpleGrid"
                  columns={[1, 1, 2, 3, 3, 4]}
                  // minChildWidth="300px"
                  spacingY="40px"
                  spacingX="80px"
                >
                  {events.map((event) => (
                    <EventListItem key={event.OgId} event={event} eventFocus={eventFocus} />
                  ))}
                </SimpleGrid>
              </CardBody>
            </Stack>
          </Card>
        </Box>
      </VStack>
    </>
  );
}

export default Events;
