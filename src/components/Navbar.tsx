import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChakraProvider,
  // Menu,
  Button,
  // MenuList,
  // MenuItem,
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
} from '@chakra-ui/react';
import Logout from './Logout';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div>
      <ChakraProvider>
        {/* <Menu> */}
        <Button ref={btnRef} onClick={onOpen} style={{ fontSize: '45px' }}>
          Ξ
        </Button>
        {'  '}
        {/* <Link to="/home" style={{fontSize: "55px"}}>⌂</Link> */}

        <Center>
          <Heading size="3xl" color="blue.600">
            <Link to="/home" style={{ fontSize: '55px' }}>
              GriefBuddy
            </Link>
          </Heading>
        </Center>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>
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
        {/* <MenuList>
          <MenuItem>
            <Link to="/profile">Profile</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/buddy">Buddy</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/chatbot">ChatBot</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/events">Local Happenings</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/resources">Resources</Link>
          </MenuItem>
          <MenuItem>
          </MenuItem>
        </MenuList> */}
        {/* </Menu> */}
      </ChakraProvider>
    </div>
  );
}

export default Navbar;
