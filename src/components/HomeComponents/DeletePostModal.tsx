import React from "react";
import { VscTrash } from 'react-icons/vsc';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    ModalCloseButton,
    Button,
    ChakraProvider,
    IconButton
  } from '@chakra-ui/react'

function DeletePostButton(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    function deleting(){
        props.onDelete()
        onClose()
    }
    return (
      <ChakraProvider>
        <IconButton 
          size="lg"
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<VscTrash color='grey'/>} 
          onClick={onOpen}
        />
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure you want to delete this post?</ModalHeader>
            <ModalBody>This action is permanent.</ModalBody>
            <ModalCloseButton />
        
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button backgroundColor='red' onClick={() => {
                // props.onDelete()
                deleting()
              }}>Delete Post</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    )
  }

  export default DeletePostButton