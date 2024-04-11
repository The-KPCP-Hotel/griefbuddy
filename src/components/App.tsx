import React = require('react');
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Profile from './Profile';
import BuddyChat from './Buddy';
import ChatBot from './ChatBot';
import Events from './Events';
import Resources from './Resources';
import { Container, Box, ChakraProvider} from '@chakra-ui/react'

function App() {
  return (
    <div>
      <ChakraProvider>
      <Container maxW="600vw" bg="blue.600" >
      <Navbar />
      </Container>
      <Routes>
        <Route path="/"   element={<HomePage />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/buddy" element={<BuddyChat />}/>
        <Route path="/chatbot" element={<ChatBot />}/>
        <Route path="/events" element={<Events />}/>
        <Route path="/resources" element={<Resources />}/>
      </Routes>
     
      </ChakraProvider>
    </div>

  );

}

export default App;
