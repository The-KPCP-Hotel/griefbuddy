import React, { useState, useEffect } from 'react';
import { Center, InputGroup, InputRightElement, VStack, Textarea, useToast } from '@chakra-ui/react';
import { VscSend } from 'react-icons/vsc';
import axios from 'axios';

import MainFeedPost from './MainFeedPost';

function MainFeed(props: any) {
  const toast = useToast();

  const [allPosts, setAllPosts] = useState([]);
  const [postMessage, setPostMessage] = useState('');
  const [postStatus, setPostStatus] = useState('');
  const [post, setPost] = useState('');

  const { googleId, userProfilePic } = props;

  function getAllPosts() {
    axios.get('/mainFeed/allPosts').then((results: any) => {
      setAllPosts(results.data);
    });
  }

  function addPost() {
    // check to see if post gets flagged
    axios.post('/chatbot/moderate', { message: { content: postMessage } }).then(({ data }) => {
      if (!data) {
        axios
          .post('/mainFeed/addPost', {
            data: {
              user: googleId,
              text: postMessage,
              userPicture: userProfilePic
            },
          })
          .then(() => {
            setPostStatus('added');
            setPost('');
            console.log(userProfilePic)
          });
      } else {
        toast({
          title: 'Flagged post.',
          description: 'Your post was flagged for inappropriate content and will not send.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  }

  useEffect(() => {
    getAllPosts();
    setPostStatus('');
  }, [postStatus]);

  return (
    <div>
      <Center mt="25px">
        <InputGroup>
          <Textarea
            placeholder="What's on your mind?"
            value={post}
            onChange={(e) => {
              setPostMessage(e.target.value);
              setPost(e.target.value);
            }}
            marginBottom="55px"
          />

          <InputRightElement
            onClick={() => {
              addPost();
            }}
          >
            <VscSend />
          </InputRightElement>
        </InputGroup>
      </Center>
      <Center>
        <VStack>
          {allPosts.map((p, i) => (
            <MainFeedPost
              // eslint-disable-next-line react/no-array-index-key
              key={`post-${i}`}
              // getPosts={getAllPosts}
              text={p.text}
              name={p.name}
              googleId={googleId}
              postId={p.id}
              usersGoogleId={p.googleId}
              setAllPosts={setAllPosts}
              userProfilePic={p.userPicture}
            />
          ))}
        </VStack>
      </Center>
    </div>
  );
}

export default MainFeed;
