import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalContent,
} from '@chakra-ui/react';

import DeleteButton from './DeleteButton';

function DeleteModal({ onDelete }: { onDelete: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* should find a better way to use onOpen than this */}
      <DeleteButton onDelete={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Are you sure you want to delete the conversation?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This action is permanent</ModalBody>
          <ModalFooter>
            <Button onClick={onClose} marginRight="15px">Close</Button>
            <DeleteButton onDelete={onDelete} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteModal;
