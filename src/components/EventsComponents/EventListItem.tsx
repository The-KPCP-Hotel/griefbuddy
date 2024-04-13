import React from 'react';

function EventListItem({ event }: { event: { title: String } }) {
  const { title } = event;
  return (
    <li>{title}</li>
  );
}

export default EventListItem;
