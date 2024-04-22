import React = require("react");
import { useState, useEffect } from "react";
import axios from "axios";
import { ChakraProvider,
Card,
CardHeader,
Heading,
CardBody,
Text,
VStack,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
useDisclosure,
Button,
CardFooter,
} from "@chakra-ui/react";
function MainFeedPost(props: any) {


    // function ManualClose() {
    //     const { isOpen, onOpen, onClose } = useDisclosure()
      
    //     return (
    //       <>
    //         <Button onClick={onOpen}>Open Modal</Button>
      
    //         <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
    //           <ModalOverlay />
    //           <ModalContent>
    //             <ModalHeader>Create your account</ModalHeader>
    //             <ModalCloseButton />
    //             <ModalBody pb={6}>
    //                 <p>Lorem ipsum dolor sit amet.</p>
    //             </ModalBody>
      
    //             <ModalFooter>
    //               <Button colorScheme='blue' mr={3}>
    //                 Save
    //               </Button>
    //               <Button onClick={onClose}>Cancel</Button>
    //             </ModalFooter>
    //           </ModalContent>
    //         </Modal>
    //       </>
    //     )
    //   }


    return (
        <ChakraProvider>
            {/* <VStack spacing='4' padding="25px"> */}
  
            <Card key={'lg'} size={'lg'} width="550px" align='center'>
                <CardHeader>
                <Heading size='md'>{props.name}</Heading>
                </CardHeader>
                <CardBody>
                <Text>{props.text}</Text>
                </CardBody>
                <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="white" margin="8px" 
                >Add Comment</Button>
                <Button colorScheme='blue' bg="blue.600" color="white" margin="8px">View Comments</Button>
                <Button colorScheme='blue' bg="red" color="white" margin="8px">Delete Post</Button>
            </CardFooter>
            </Card>
            {/* </VStack> */}
        </ChakraProvider>
        )
}

export default MainFeedPost