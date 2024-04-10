import React = require('react');

// import { useContext, useEffect } from 'react';

// import axios from 'axios';

import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Profile from './Profile';
import BuddyChat from './Buddy';
import ChatBot from './ChatBot';
import Events from './Events';
import Resources from './Resources';
import Login from './Login';

// const UserContext = createContext(null);
import { UserContextProvider } from '../context/UserContext';

function App() {
  // const [user, setUser] = useState({});

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
  // }, []);
  // getUser();

  // const { user, login, logout } = useUser();

  return (
    <UserContextProvider>
      {/* <> */}
      {/* <UserContext.Provider value={user}> */}

      {/* if path is index, we don't want to show navbar */}
      <Navbar />
      <Routes>
        <Route index element={<Login />} />
        {/* <Route path="/home" element={<HomePage user={user} />} /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buddy" element={<BuddyChat />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
      {/* </UserContext.Provider> */}

      {/* </> */}
    </UserContextProvider>
  );
}

export default App;
