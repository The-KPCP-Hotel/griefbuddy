import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';

function Event() {
  const { id } = useParams();
  console.log(id);

  const [event, setEvent] = useState({});

  useEffect(() => {
    axios.get(`/events/event/${id}`)
      .then(({ data }) => {
        // console.log(response);
        setEvent(data);
      })
      .catch((err) => console.error('failed finding event', err));
  });

  return (
    <ChakraProvider>
      <Link to="/home" style={{ fontSize: '55px' }}>
        ⌂
      </Link>
    </ChakraProvider>
  );
}

export default Event;
