import React = require('react');
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext, AuthUser } from '../context/UserContext';

function Buddy() {
  const userContext = useContext(UserContext);
  const { setUser, user } = userContext;

  const [buddiesOnline, setBuddiesOnline] = useState(0);

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

  const simulateUserJoin = () => {
    setBuddiesOnline((prevCount) => {
      if (prevCount < 4) {
        return prevCount + 1;
      }
      if (prevCount === 4) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };

  // imitate user joining
  useEffect(() => {
    const interval = setInterval(simulateUserJoin, 2700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Link to="/home">Home</Link>
      <h1>{`Hey ${user?.name.split(' ')[0]}✌️`}</h1>
      <Link to="/buddychat">BuddyChat</Link>
      {buddiesOnline === 0 ? (
        <div>
          <h4>No buddies online right now...🫤</h4>
          <h6>
            Do not fret! Any message you send them will be seen when they are
            back online.
          </h6>
        </div>
      ) : (
        <h4>{`You have ${buddiesOnline} buddies online!`}</h4>
      )}
      {/* might need path params? */}
      <div>
        <Link to="/buddychat:weekly" className="btn btn-primary">
          Bud R.
        </Link>
      </div>
      <div>
        <Link
          to="/buddychat:<identifier for chat with user and timmy t.>"
          className="btn btn-primary"
        >
          Timmy T.
        </Link>
      </div>
      <div>
        <Link
          to="/buddychat:<identifier for chat with user and josuke c.>"
          className="btn btn-primary"
        >
          Jolyne C.
        </Link>
      </div>
    </div>
  );
}

export default Buddy;
