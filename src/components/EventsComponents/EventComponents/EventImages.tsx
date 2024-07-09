import React from 'react';
import { Wrap, WrapItem, Center } from '@chakra-ui/react';

import EventImage, { MediaRawItem } from './EventImage';

function EventImages({ media_raw, id }: { media_raw: MediaRawItem[], id: string }) {
  return (
    <Wrap justify="center" spacing="30px">
      {media_raw ? (
        media_raw.map((url: MediaRawItem) => (
          <WrapItem key={`wi-${id}-${url.sortorder}`}>
            <Center>
              <EventImage key={`ev-${id}-${url.sortorder}`} url={url} />
            </Center>
          </WrapItem>
        ))
      ) : (
        <WrapItem key={`wi-${id}-default`}>
          <Center>
            <EventImage
              url={{
                mediaurl:
                  'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_72,q_75,w_123/v1/clients/neworleans/NewOrleansLogo_Website_Dark_Grey_1a1a1a_123px_3c60c0e3-35b0-4efb-9685-d2f5ac92528a.jpg',
                sortorder: 1,
              }}
            />
          </Center>
        </WrapItem>
      )}
    </Wrap>
  );
}

export default EventImages;
