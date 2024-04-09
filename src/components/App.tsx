import React = require('react');

import { createContext, useState } from 'react';

import axios from 'axios';

import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Profile from './Profile';
import BuddyChat from './Buddy';
import ChatBot from './ChatBot';
import Events from './Events';
import Resources from './Resources';
import Login from './Login';

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  // let user;
  const getUser = () => axios
    .get('/user')
    .then(({ data }: { data: object }) => {
      console.log(data);
      if (typeof data === 'object') {
        // setUser(data);
        // user = data;
        setUser(user);
        // useContext(data);
      }
      // console.log(user);
    })
    .catch();

  // useEffect(() => {
  //   axios
  //     .get('/user')
  //     .then(({ data }: { data: object }) => {
  //       console.log(data);
  //       if (typeof data === 'object') {
  //         const curUser = { ...data };
  //         setUser(curUser);
  //       }
  //       // console.log(user);
  //     })
  //     .catch((err: Error) => console.error('failed setting user', err));
  // }, [user]);
  getUser();
  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
  );
}

export default App;
