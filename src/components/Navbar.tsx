import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
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
  VStack,
  StackDivider,
  Flex,
  Spacer,
  Container,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Logout from './Logout';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue('blue.200', 'blue.600');
  const text = useColorModeValue('blue.600', 'blue.200');
  return (
    <Container
      className="navContainer"
      width="100%"
      maxW="inherit"
      // bg="blue.200"
      bg={bg}
      marginTop="0px"
      marginBottom="15px"
      h="125px"
    >
      <Flex className="navFlex" paddingTop="20px" alignItems="center" gap="2">
        <Box className="GriefBuddyBox" p="2">
          <Center>
            {/* <Heading size="3xl" color="blue.600"> */}
            <Heading size="3xl" color={text}>

              {useLocation().pathname === '/' ? (
                'GriefBuddy'
              ) : (
                <Link to="/home" style={{ fontSize: '55px' }}>
                  GriefBuddy
                </Link>
              )}
            </Heading>
          </Center>
        </Box>
        <Spacer />
        <Box p="2">
          {useLocation().pathname === '/' ? null : (
            <Button
              // colorScheme="blue.200"
              colorScheme={bg}
              ref={btnRef}
              onClick={onOpen}
              style={{ fontSize: '45px' }}
            >
              Ξ
            </Button>
          )}
        </Box>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        {/* <DrawerContent backgroundColor="blue.200"> */}
        <DrawerContent backgroundColor={bg}>

          <DrawerCloseButton />
          {/* <DrawerBody color="blue.600" textDecorationThickness="bold"> */}
          <DrawerBody color={text} textDecorationThickness="bold">

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
              <Logout />
              <Button onClick={toggleColorMode}>
                {`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export default Navbar;
