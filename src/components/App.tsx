import React, { Suspense, lazy } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Skeleton } from '@chakra-ui/react';

import HomePage from './HomePage';
import NavBarContainer from './NavBarContainer';
import Profile from './Profile';
import Buddy from './Buddy';
import ChatBot from './ChatBot';
import Events from './Events';
import Event from './EventsComponents/Event';
import Resources from './Resources';
import Resource from './Resource';
import Login from './Login';
import { UserContextProvider } from '../context/UserContext';
import BuddyChat from './buddyChildren/BuddyChat';

const MeetupMap = lazy(() => import('./MeetupMap'));

function App() {
  // trying to figure out how to keep user context updated through page refreshes
  // user context setUser is not a function here...

  return (
    <BrowserRouter>
      <UserContextProvider>
        <NavBarContainer />
        <Suspense fallback={<Skeleton />}>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/buddy" element={<Buddy />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/events" element={<Events />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resource" element={<Resource />} />
            <Route path="/buddychat" element={<BuddyChat />} />
            <Route path="/events/:id" element={<Event />} />
            <Route
              path="/map"
              element={(
                <Suspense fallback={<Skeleton />}>
                  <MeetupMap />
                </Suspense>
              )}
            />
          </Routes>
        </Suspense>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
