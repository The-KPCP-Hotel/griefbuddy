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
  DrawerHeader,
  VStack,
  StackDivider,
  Flex,
  Spacer,
  Container,
  useColorMode,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import Logout from './Logout';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue('blue.200', 'blue.600');
  const textHeading = useColorModeValue('blue.600', 'blue.200');
  const text = useColorModeValue('blue.600', 'whitesmoke');

  return (
    <Container className="navContainer" width="100%" maxW="inherit" bg={bg} h="4.5rem">
      <Flex className="navFlex" alignItems="center" gap="2" minWidth="max-content">
        <Box className="GriefBuddyBox">
          <Center>
            <Heading as="h1" size="xl" color={textHeading}>
              {useLocation().pathname === '/' ? (
                'GriefBuddy'
              ) : (
                <Link to="/home" style={{ fontSize: '2.5rem' }}>
                  GriefBuddy
                </Link>
              )}
            </Heading>
          </Center>
        </Box>
        {useLocation().pathname === '/' ? null : <Image maxW="3rem" src="grief-buddy.png" />}
        <Spacer />
        <Box p="2">
          {useLocation().pathname === '/' ? (
            <Image maxW="3rem" src="grief-buddy.png" />
          ) : (
            <Button
              colorScheme={bg}
              ref={btnRef}
              onClick={onOpen}
              style={{ fontSize: '45px' }}
              aria-label="open navigation bar"
            >
              Ξ
            </Button>
          )}
        </Box>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent backgroundColor={bg}>
          <DrawerHeader>
            <Button onClick={toggleColorMode} aria-label="toggle dark and light mode">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </DrawerHeader>

          <DrawerCloseButton />
          <DrawerBody color={text} textDecorationThickness="bold">
            <VStack divider={<StackDivider />}>
              <Link onClick={onClose} to="/profile">
                Profile
              </Link>
              <Link onClick={onClose} to="/chat">
                Chat
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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export default Navbar;
