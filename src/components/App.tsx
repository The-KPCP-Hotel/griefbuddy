import React = require('react');
import axios, { AxiosResponse } from 'axios';

import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Profile from './Profile';
import BuddyChat from './Buddy';
import ChatBot from './ChatBot';
import Events from './Events';
import Resources from './Resources';
import Login from './Login';

function App() {
  const getUser = () => {
    axios.get('/user')
      .then((response: AxiosResponse) => console.log(response))
      .catch();
  };

  getUser();
  return (
    <div>
      {/* if path is index, we don't want to show navbar */}
      <Navbar />

      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buddy" element={<BuddyChat />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </div>
  );
}

export default App;
