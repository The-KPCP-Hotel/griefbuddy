import React from 'react';
import Calendar from 'react-calendar';

function EventsCalendar(props: { events: any[] }) {
  const { events } = props;
  return (
    <Calendar events={events} />
  );
}

export default EventsCalendar;
