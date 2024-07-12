import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
  Card,
  Heading,
  CardBody,
  Text,
  Link as ChakraLink,
  Container,
  useColorModeValue,
  CardHeader,
} from '@chakra-ui/react';
import { ExternalLinkIcon, ArrowBackIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import axios from 'axios';

import EventImages from './EventComponents/EventImages';
import { EventType } from './EventComponents/EventImage';

function Event() {
  const { id } = useParams();

  const [event, setEvent] = useState({} as EventType);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { recurrence, title, description, address, media_raw } = event;

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [next, setNext] = useState(null);

  const color = useColorModeValue('blue.600', 'blue.200');

  useEffect(() => {
    axios
      .get(`/events/event/${id}`)
      .then(({ data }) => {
        setEvent(data);
        setStart(dayjs(data.startDate).format('dddd, MMMM D, YYYY'));
        setEnd(dayjs(data.endDate).format('dddd, MMMM D, YYYY'));
        setNext(dayjs(data.nextDate).format('dddd, MMMM D, YYYY'));
      })
      .catch((err) => console.error('failed finding event', err));
  }, [id]);

  function happening() {
    let happeningOn;
    const today = new Date();
    const todayTime = today.getTime();
    // converting startTime from String to string
    const startString = String(event.startDate);
    const startDateTime = new Date(startString).getTime();
    if (start === end || startDateTime > todayTime) {
      happeningOn = <Text>{`Happening on ${start}`}</Text>;
    } else if (!event.endDate) {
      happeningOn = <Text>{`Next happening on ${next}`}</Text>;
    } else {
      happeningOn = <Text>{`Make sure to check it out between ${start} and ${end}`}</Text>;
    }
    return happeningOn;
  }

  return (
    <>
      <ChakraLink as={ReactRouterLink} to="/events" paddingLeft="10px">
        <ArrowBackIcon />
        Back to Local Happenings
      </ChakraLink>
      <Container maxW="7xl">
        <Card variant="unstyled">
          <CardHeader mt=".5rem" mb=".5rem">
            <Heading textAlign="center" size="md" color={color}>
              {title}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text color={color} fontWeight="bold" as="span">
              {'Location: '}
            </Text>
            <Text as="span">{description}</Text>
            <br />
            {address !== 'N/A' && address ? (
              <Text>
                <Text color={color} fontWeight="bold" as="span">
                  {'Address: '}
                </Text>
                <ChakraLink
                  href={`https://www.google.com/maps/search/?api=1&query=${address
                    .replace('/ /g', '+')
                    .replace('/,/g', '%2C')}`}
                  isExternal
                >
                  {address}
                  <ExternalLinkIcon mx="2px" />
                </ChakraLink>
              </Text>
            ) : null}
            {happening()}
            {recurrence ? <Text>{recurrence}</Text> : null}
            <ChakraLink href={event.url} isExternal>
              More information on their site
              <ExternalLinkIcon mx="2px" />
            </ChakraLink>
            <EventImages media_raw={media_raw} id={id} />
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default Event;
