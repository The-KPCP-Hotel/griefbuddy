import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChakraProvider, Heading, Center } from '@chakra-ui/react';

import EventListItem from './EventsComponents/EventListItem';
import EventsBigCalendar from './EventsComponents/EventsCalendar';

function Events() {
  const [events, setEvents] = useState([]);
  const [eventsToday, setEventsToday] = useState([]);

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
      <Link to="/home" style={{ fontSize: '55px' }}>⌂</Link>
      <Center>
        <Heading size="3xl" color="blue.200">Events</Heading>
      </Center>
      <ul>
        Today&apos;s Events
        {eventsToday.map((event) => (
          <EventListItem key={event.OgId} event={event} />
        ))}
      </ul>
      <EventsBigCalendar events={events} />
    </ChakraProvider>
  );
}

export default Events;
