import React, { useState, useEffect } from 'react';
import { Center, Input, VStack, Button } from '@chakra-ui/react';
import axios from 'axios';

import MainFeedPost from './MainFeedPost';

function MainFeed(props: any) {
  const [allPosts, setAllPosts] = useState([]);
  const [postMessage, setPostMessage] = useState('');
  const [postStatus, setPostStatus] = useState('');
  const [post, setPost] = useState('');

  const { googleId } = props;

  function getAllPosts() {
    axios.get('/mainFeed/allPosts').then((results: any) => {
      setAllPosts(results.data);
    });
  }

  function addPost() {
    axios
      .post('/mainFeed/addPost', {
        data: {
          user: googleId,
          text: postMessage,
        },
      })
      .then(() => {
        setPostStatus('added');
        setPost('');
      });
  }

  useEffect(() => {
    getAllPosts();
    setPostStatus('');
  }, [postStatus]);

  return (
    <div>
      <Center mt="25px">
        <Input
          placeholder="Add Post Here"
          value={post}
          onChange={(e) => {
            setPostMessage(e.target.value);
            setPost(e.target.value);
          }}
        />
      </Center>
      <Center>
        <Button
          margin="25px"
          onClick={() => {
            addPost();
          }}
        >
          Submit Post
        </Button>
      </Center>
      <Center>
        <VStack>
          {allPosts.map((p, i) => (
            <MainFeedPost
              // eslint-disable-next-line react/no-array-index-key
              key={`post-${i}`}
              getPosts={getAllPosts}
              text={p.text}
              name={p.name}
              googleId={googleId}
              postId={p.id}
              usersGoogleId={p.googleId}
            />
          ))}
        </VStack>
      </Center>
    </div>
  );
}

export default MainFeed;
