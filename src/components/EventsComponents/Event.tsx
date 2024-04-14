import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
  // stay new line
  Card,
  CardHeader,
  Image,
  ChakraProvider,
  CardBody,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import axios from 'axios';

function Event() {
  const { id } = useParams();

  type EventType = {
    id: Number;
    title: String;
    media_raw: any[];
    description: String;
    address: String;
    url: string;
    startDate: String;
    endDate: String;
  };

  const [event, setEvent] = useState({} as EventType);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  useEffect(() => {
    axios
      .get(`/events/event/${id}`)
      .then(({ data }) => {
        setEvent(data);
        const startDate = new Date(data.startDate);
        // console.log(startDate);
        setStart(startDate.toLocaleString());
        const endDate = new Date(data.endDate);
        setEnd(endDate.toLocaleString());
      })
      .catch((err) => console.error('failed finding event', err));
  }, [id]);

  return (
    <ChakraProvider>
      <ReactRouterLink to="/home" style={{ fontSize: '55px' }}>
        ⌂
      </ReactRouterLink>
      <Card>
        <CardHeader>{event.title}</CardHeader>
        <CardBody>
          <Text>{event.description}</Text>
          <Text>{event.address}</Text>
          <ChakraLink href={event.url} isExternal>
            Check out their site
            <ExternalLinkIcon mx="2px" />
          </ChakraLink>
          <Text>{`Make sure to check it out between ${start} and ${end}`}</Text>
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
