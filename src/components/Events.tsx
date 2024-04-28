import React, { useState, useEffect } from 'react';
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

  const [eventFocus, setEventFocus] = useState('');

  function scrollToEvent(ogId: string) {
    const eventNode = document.getElementById(ogId);

    eventNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
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
              <EventsBigCalendar setEventFocus={setEventFocus} events={events} />
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
                <SimpleGrid className="simpleGrid" columns={[1, 1, 2, 3, 3, 4]} spacingY="40px" spacingX="80px">
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
