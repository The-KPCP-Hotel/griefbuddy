import React = require('react');

import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

function HomePage() {
  const userContext = useContext(UserContext);

  const { setUser, user } = userContext;

  useEffect(() => {
    setUser({
      id: 1,
      name: 'Peyton',
      googleId: '1234',
    });
  }, [setUser]);

  console.log(userContext);
  return (
    <div>
      <h1>HomePage</h1>
      <h2>{`Welcome ${user?.name}`}</h2>
    </div>
  );
}

export default HomePage;
