import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import { Container, ChakraProvider } from '@chakra-ui/react';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Profile from './Profile';
import Buddy from './Buddy';
import ChatBot from './ChatBot';
import Events from './Events';
import Event from './EventsComponents/Event';
import Resources from './Resources';
import Login from './Login';
import { UserContextProvider } from '../context/UserContext';
import BuddyChat from './buddyChildren/BuddyChat';

function App() {
  // trying to figure out how to keep user context updated through page refreshes
  // user context setUser is not a function here...
  return (
    <UserContextProvider>
      <ChakraProvider>
        <Container maxW="7xl" bg="blue.200" marginTop="25px" marginBottom="15px" h="250px">
          {useLocation().pathname === '/' ? <div /> : <Navbar />}
        </Container>
      </ChakraProvider>

      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buddy" element={<Buddy />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/buddychat" element={<BuddyChat />} />
        <Route path="/events/:id" element={<Event />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
