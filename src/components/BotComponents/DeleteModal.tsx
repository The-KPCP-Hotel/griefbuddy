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
  MenuItem,
} from '@chakra-ui/react';

import DeleteButton from './DeleteButton';

function DeleteModal({ onDelete }: { onDelete: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteClose = () => {
    onDelete();
    onClose();
  };

  return (
    <>
      <MenuItem onClick={onOpen}>Delete Conversation</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Are you sure you want to delete the conversation?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This action is permanent</ModalBody>
          <ModalFooter>
            <Button onClick={onClose} marginRight="15px">
              Close
            </Button>
            <DeleteButton onClick={deleteClose} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteModal;
