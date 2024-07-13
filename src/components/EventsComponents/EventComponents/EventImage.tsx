import React from 'react';
import {
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

export type EventType = {
  id: Number;
  title: String;
  media_raw: MediaRawItem[];
  description: String;
  address: String;
  url: string;
  startDate: String;
  endDate: String;
  nextDate: String;
  recurrence: String;
};

export type MediaRawItem = {
  mediaurl: string;
  sortorder: Number;
};

function EventImage({ url }: { url: MediaRawItem }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onHover() {
    document.body.style.cursor = 'zoom-in';
  }

  function offHover() {
    document.body.style.cursor = 'default';
  }
  return (
    <>
      <Image onClick={onOpen} onMouseOver={onHover} onMouseLeave={offHover} src={url.mediaurl} width="500px" maxW="95%" />
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay backdropFilter="auto" backdropBlur="10px" />
        <ModalContent>
          <ModalCloseButton background="blue.200" />
          <Image src={url.mediaurl} />
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventImage;
