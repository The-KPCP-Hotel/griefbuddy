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
            <Heading size="3xl" color={textHeading}>
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
              aria-label="open navigation bar"
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
          <DrawerHeader>
            <Button onClick={toggleColorMode} aria-label="toggle dark and light mode">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </DrawerHeader>

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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export default Navbar;
