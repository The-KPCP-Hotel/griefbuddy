import React = require('react');

import axios from 'axios';

import { useContext, useEffect } from 'react';
import { UserContext, AuthUser } from '../context/UserContext';

function HomePage() {
  const userContext = useContext(UserContext);

  const { setUser, user } = userContext;

  useEffect(() => {
    axios
      .get('/user')
      .then(({ data }: { data: AuthUser }) => {
        console.log(data);
        if (typeof data === 'object') {
          const curUser = { ...data };
          setUser(curUser);
        }
        // console.log(user);
      })
      .catch((err: Error) => console.error('failed setting user', err));

    // setUser({
    //   id: 1,
    //   name: 'Peyton',
    //   googleId: '1234',
    // });
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
