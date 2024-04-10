import React = require('react');

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Login() {
  const userContext = useContext(UserContext);
  console.log(userContext);
  const handleLogin = () => {
    userContext.setUser({
      id: 1,
      name: 'Peyton',
      googleId: '1234',
    });
  };
  return (
    <div>
      <h1>Google Login</h1>
      <form action="/auth/google" method="GET">
        <button type="submit" onClick={handleLogin}>GOOGLE BUTTON</button>
      </form>
    </div>
  );
}

export default Login;
