import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  // stay new line
  Card,
  CardHeader,
  Image,
  ChakraProvider,
  CardBody,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';

function Event() {
  const { id } = useParams();
  console.log(id);

  type EventType = {
    id: Number;
    title: String;
    media_raw: any[];
    description: String;
    address: String;
  };

  const [event, setEvent] = useState({} as EventType);

  useEffect(() => {
    axios
      .get(`/events/event/${id}`)
      .then(({ data }) => {
        // console.log(response);
        setEvent(data);
      })
      .catch((err) => console.error('failed finding event', err));
  }, [id]);

  return (
    <ChakraProvider>
      <Link to="/home" style={{ fontSize: '55px' }}>
        ⌂
      </Link>
      <Card>
        <CardHeader>{event.title}</CardHeader>
        <CardBody>
          <Text>{event.description}</Text>
          <Text>{event.address}</Text>
          {event.media_raw ? (
            event.media_raw.map((url) => (
              <Image key={`${event.id}-${url.sortorder}`} src={url.mediaurl} />
            ))
          ) : (
            <div />
          )}
        </CardBody>
      </Card>
    </ChakraProvider>
  );
}

export default Event;
