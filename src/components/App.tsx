import React = require('react');
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Profile from './Profile';
import BuddyChat from './Buddy';
import ChatBot from './ChatBot';
import Events from './Events';
import Resources from './Resources';

function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/"   element={<HomePage />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/buddy" element={<BuddyChat />}/>
        <Route path="/chatbot" element={<ChatBot />}/>
        <Route path="/events" element={<Events />}/>
        <Route path="/resources" element={<Resources />}/>
      </Routes>
    </div>

  );

}

export default App;
