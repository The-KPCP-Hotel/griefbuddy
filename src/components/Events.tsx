import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventListItem from './EventsComponents/EventListItem';

function Events() {
  const [events, setEvents] = useState([]);
  const [eventsToday, setEventsToday] = useState([]);

  useEffect(() => {
    axios
      .get('/events/all')
      .then(({ data }) => {
        setEvents(data);
        const today = new Date().toISOString();
        console.log(today);
        const curEvents = data.filter(
          (event: { date: String }) => event.date.slice(0, 10) === today.slice(0, 10),
        );
        setEventsToday(curEvents);
      })
      .catch();
  }, []);

  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>Events Page</h1>
      <ul>
        Today&apos;s Events
        {eventsToday.map((event) => (
          <EventListItem key={event.OgId} event={event} />
        ))}
      </ul>
    </div>
  );
}

export default Events;
