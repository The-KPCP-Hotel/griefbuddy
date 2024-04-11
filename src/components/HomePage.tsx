import React = require('react');

import axios from 'axios';

import { useContext, useEffect } from 'react';
import { UserContext, AuthUser } from '../context/UserContext';

function HomePage() {
  const userContext = useContext(UserContext);

  const { setUser, user } = userContext;

  // want to find a better solution than calling db every time homepage is rendered
  useEffect(() => {
    axios
      .get('/user')
      .then(({ data }: { data: AuthUser }) => {
        if (typeof data === 'object') {
          const curUser = { ...data };
          setUser(curUser);
        }
      })
      .catch((err: Error) => console.error('failed setting user', err));
  }, [setUser]);

  return (
    <div>
      <h1>HomePage</h1>
      <h2>{`Welcome ${user?.name.split(' ')[0]}`}</h2>
    </div>
  );
}

export default HomePage;
