import React = require('react');

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function HomePage() {
  const userContext = useContext(UserContext);
  console.log(userContext);
  return (
    <div>
      <h1>HomePage</h1>
      <h2>{`Welcome ${userContext?.user?.name}`}</h2>
    </div>
  );
}

export default HomePage;
