import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventListItem from './EventsComponents/EventListItem';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('/events/all')
      .then(({ data }) => {
        setEvents(data);
      })
      .catch();
  }, [events]);

  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>Events Page</h1>
      <ul>
        {'Today\'s Events'}
        {events.map((event) => <EventListItem event={event} />)}
      </ul>
    </div>
  );
}

export default Events;
