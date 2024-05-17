import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Heading, Center, Container } from '@chakra-ui/react';
import { UserContext, AuthUser } from '../context/UserContext';

function Buddy() {
  const userContext = useContext(UserContext);
  const { setUser, user } = userContext;
  // const [buddies, setBuddies] = useState([]);

  const [buddiesOnline, setBuddiesOnline] = useState(0);

  useEffect(() => {
    axios
      .get('/user')
      .then(({ data }: { data: AuthUser }) => {
        if (typeof data === 'object') {
          const curUser = { ...data };
          setUser(curUser);
          // setBuddies(curUser.buddies);
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
    <>
      <Center>
        <Heading size="3xl" color="blue.200">
          Buddy
        </Heading>
      </Center>
      <Container maxW="7xl">
        <h1>{`Hey ${user?.name.split(' ')[0]}✌️`}</h1>
        <Link to="/buddychat">Buddy Chat</Link>
        {buddiesOnline === 0 ? (
          <div>
            <h4>No buddies online right now...🫤</h4>
            <h6>Do not fret! Any message you send them will be seen when they are back online.</h6>
          </div>
        ) : (
          <h4>{`You have ${buddiesOnline} buddies online!`}</h4>
        )}
        {/* might need path params? */}
        <div>
          <Link to="/buddychat/:weekly" className="btn btn-primary">
            Rob R.
          </Link>
        </div>
        <div>
          <Link to="/buddychat/:timmy" className="btn btn-primary">
            Timmy T.
          </Link>
        </div>
        <div>
          <Link to="/buddychat/:jolyne" className="btn btn-primary">
            Jolyne C.
          </Link>
        </div>
      </Container>
    </>
  );
}

export default Buddy;
