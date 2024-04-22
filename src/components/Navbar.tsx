import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChakraProvider,
  Button,
  Box,
  Center,
  Heading,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  VStack,
  StackDivider,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import Logout from './Logout';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div>
      <ChakraProvider>
        {/* <Menu> */}
        {/* {'  '} */}
        <Flex minWidth="max-content" paddingTop="20px" alignItems="center" gap="2">
          <Box p="2">
            <Center>
              <Heading size="3xl" color="blue.600">
                <Link to="/home" style={{ fontSize: '55px' }}>
                  GriefBuddy
                </Link>
              </Heading>
            </Center>
          </Box>
          <Spacer />
          <Box p="2">
            <Button
              colorScheme="blue.200"
              ref={btnRef}
              onClick={onOpen}
              style={{ fontSize: '45px' }}
            >
              Ξ
            </Button>
          </Box>
        </Flex>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent backgroundColor="blue.200">
            <DrawerCloseButton />
            <DrawerBody color="blue.600" textDecorationThickness="bold">
              <VStack divider={<StackDivider />}>
                <Link onClick={onClose} to="/profile">
                  Profile
                </Link>
                <Link onClick={onClose} to="/buddy">
                  Buddy
                </Link>
                <Link onClick={onClose} to="/chatbot">
                  ChatBot
                </Link>
                <Link onClick={onClose} to="/events">
                  Local Happenings
                </Link>
                <Link onClick={onClose} to="/map">
                  Meetup Map
                </Link>
                <Link onClick={onClose} to="/resources">
                  Resources
                </Link>
              </VStack>
              <DrawerFooter>
                <Logout />
              </DrawerFooter>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </ChakraProvider>
    </div>
  );
}

export default Navbar;
