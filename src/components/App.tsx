import React = require('react');

import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Profile from './Profile';
import Buddy from './Buddy';
import ChatBot from './ChatBot';
import Events from './Events';
import Resources from './Resources';
import Login from './Login';

import { UserContextProvider } from '../context/UserContext';
import BuddyChat from './buddyChildren/BuddyChat';

function App() {
  const location = useLocation();

  return (
    <UserContextProvider>
      {(location.pathname === '/') ? <div /> : <Navbar />}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buddy" element={<Buddy />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/buddychat" element={<BuddyChat />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
