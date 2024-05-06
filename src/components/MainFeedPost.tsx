import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  Input,
  Button,
  CardFooter,
  Center,
} from '@chakra-ui/react';

function MainFeedPost(props: any) {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [deleted, setDeleted] = useState('false');

  const { googleId, postId, getPosts, name, text } = props;
  function addComment() {
    axios
      .post('/mainFeed/addComment', {
        data: {
          user: googleId,
          text: comment,
          postId: postId
        },
      })
      .then(() => {
        setComment('');
      });
  }

  function deletePost() {
    axios
      .delete('/mainFeed/deletePost', {
        data: {
          id: postId,
        },
      })
      .then(() => {
        setDeleted('true');
      });
  }

  function getAllComments(){
    axios
      .get('/mainFeed/allComments', {
        data: {
          user: googleId,
          text: comment,
          postId: postId
        },
      })
      .then((results: any) => {
        let returnedData = results.data
        setAllComments(returnedData);
      });
  }

  useEffect(() => {
    getAllComments()
  }, [allComments]);

  useEffect(() => {
    getPosts();
    setDeleted('false');
  }, [deleted]);

  return (
    <ChakraProvider>
      <Card key="lg" size="lg" width="550px" align="center" overflow="scroll">
        <CardHeader>
          <Heading size="md">{`@${name}`}</Heading>
        </CardHeader>
        <CardBody>
          <Text>{text}</Text>
        </CardBody>
        <Input
          placeholder="Add Comment Here"
          width="350px"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <CardFooter>
          <Button
            colorScheme="blue"
            bg="blue.200"
            color="white"
            margin="8px"
            onClick={() => {
              addComment();
            }}
          >
            Add Comment
          </Button>
          <Button
            colorScheme="blue"
            bg="red"
            color="white"
            margin="8px"
            onClick={() => {
              deletePost();
            }}
          >
            Delete Post
          </Button>
        </CardFooter>
        <Center>
          <h3>Comments:</h3>
        </Center>

        <ul>
          {allComments.map((c, i) => (
            c.postId === postId && <li key={i}>{c.text}</li>
          ))}
        </ul>
      </Card>
    </ChakraProvider>
  );
}

export default MainFeedPost;
