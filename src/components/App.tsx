import React = require('react');

import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Profile from './Profile';
import BuddyChat from './Buddy';
import ChatBot from './ChatBot';
import Events from './Events';
import Resources from './Resources';
import { Container, Box, ChakraProvider} from '@chakra-ui/react'
import Login from './Login';
import { UserContextProvider } from '../context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <ChakraProvider>
      <Container maxW="7xl" bg="blue.200" marginTop={"25px"} marginBottom={"15px"} h={"250px"}>
      {(useLocation().pathname === '/') ? <div /> : <Navbar />}

      </Container>
      </ChakraProvider>
    
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buddy" element={<BuddyChat />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
      </UserContextProvider>
      
    

   
  );
}

export default App;
