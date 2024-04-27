import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Heading,
  Center,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  VStack,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';

import EventListItem from './EventsComponents/EventListItem';
import EventsBigCalendar from './EventsComponents/EventsCalendar';

function Events() {
  const [events, setEvents] = useState([]);
  const [eventsToday, setEventsToday] = useState([]);

  const eventRef = useRef(null);
  const [eventFocus, setEventFocus] = useState('');

  function scrollToEvent(ogId: string) {
    const eventNode = document.getElementById(ogId);
    console.log(eventNode);
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

  return (
    <ChakraProvider>
      <VStack divider={<StackDivider />} spacing="4">
        <Box>
          <Center>
            <Heading size="3xl" color="blue.200">
              Events
            </Heading>
          </Center>
        </Box>
        <Box>
          <Card>
            <CardHeader>
              <Heading size="md">Today&apos;s Events</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {eventsToday.map((event) => (
                  <EventListItem key={event.OgId} event={event} />
                ))}
              </Stack>
            </CardBody>
          </Card>
        </Box>
        <Box>
          <Card>
            <Stack>
              <EventsBigCalendar
                setEventFocus={setEventFocus}
                eventRef={eventRef}
                events={events}
              />
            </Stack>
          </Card>
        </Box>
        <Box>
          <Card>
            <Stack>
              <CardHeader>
                <Heading size="md">All Events</Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid className="simpleGrid" ref={eventRef} columns={4} spacing="4">
                  {events.map((event) => (
                    <EventListItem key={event.OgId} event={event} />
                  ))}
                </SimpleGrid>
              </CardBody>
            </Stack>
          </Card>
        </Box>
      </VStack>
    </ChakraProvider>
  );
}

export default Events;
