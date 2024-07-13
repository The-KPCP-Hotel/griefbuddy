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
  Icon,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, CalendarIcon, ChatIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
import { VscRobot, VscLocation } from 'react-icons/vsc';

import Logout from './Logout';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue('blue.200', 'blue.600');
  const textHeading = useColorModeValue('blue.600', 'blue.200');
  const text = useColorModeValue('blue.600', 'whitesmoke');

  return (
    <Container className="navContainer" width="100%" maxW="inherit" bg={bg} h="3.25rem" p="0">
      <Flex className="navFlex" alignItems="center" gap="2" minWidth="max-content" maxH="3.25rem">
        <Box className="GriefBuddyBox">
          <Center>
            <Heading as="h1" size="xl" color={textHeading}>
              {useLocation().pathname === '/' ? (
                <Image maxH="3.25rem" pl=".45rem" src={`${window.location.origin}/name`} />
              ) : (
                <Link to="/home" style={{ fontSize: '2.5rem' }}>
                  <Image maxH="3.25rem" pl=".25rem" src={`${window.location.origin}/named-logo`} />
                </Link>
              )}
            </Heading>
          </Center>
        </Box>
        <Spacer />
        <Box>
          {useLocation().pathname === '/' ? (
            <Image pr=".5rem" maxH="3.25rem" src="grief-buddy.png" />
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
            <Button onClick={toggleColorMode} aria-label="toggle dark and light mode" boxSize="2.5rem">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </DrawerHeader>

          <DrawerCloseButton />
          <DrawerBody color={text} textDecorationThickness="bold">
            <VStack divider={<StackDivider />}>
              <Link onClick={onClose} to="/profile">
                <EditIcon />
                {' Profile'}
              </Link>
              <Link onClick={onClose} to="/chat">
                <ChatIcon />
                {' Chat'}
              </Link>
              <Link onClick={onClose} to="/chatbot">
                <Icon as={VscRobot} />
                {' ChatBot'}
              </Link>
              <Link onClick={onClose} to="/events">
                <CalendarIcon />
                {' Local Happenings'}
              </Link>
              <Link onClick={onClose} to="/map">
                <Icon as={VscLocation} />
                {' Meetup Map'}
              </Link>
              <Link onClick={onClose} to="/resources">
                <InfoIcon />
                {' Resources'}
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
