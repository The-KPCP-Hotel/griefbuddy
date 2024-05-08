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
  VStack,
  StackDivider,
  Box,
  Flex,
  Avatar, 
  IconButton,
  Image,
} from '@chakra-ui/react';

function MainFeedPost(props: any) {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [deleted, setDeleted] = useState('false');
  const [commentDeleted, setCommentDeleted] = useState('false')
  const { googleId, postId, getPosts, name, text, usersGoogleId } = props;
  function addComment() {
    axios
      .post('/mainFeed/addComment', {
        data: {
          googleId: googleId,
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

  function deleteComment(commentId: Number){
    axios
      .delete('/mainFeed/deleteComment', {
        data: {
          id: commentId,
        },
      })
      .then(() => {
        setCommentDeleted('true');
      });
  }

  function canOnlyDeleteCommentIfUser() {
      return (
        <>
        {allComments.map((c, i) => {
          if(googleId === usersGoogleId){
            // return c.postId === postId && <li style={{listStyleType: "none"}} key={i}>@<span style={{textDecoration: "underline"}}>{`${name}`}</span>:  {c.text}{' '}<button onClick={() => {
            //   deleteComment(c.id)
            // }}>  ❌  </button></li>
            
            return c.postId === postId && <Flex justifyContent={"space-between"}><Box key={i} h='40px' bg='whitesmoke' w="400px" marginBottom="10px" padding="8px">@<span style={{textDecoration: "underline"}}>{`${name}`}</span>:  {c.text}<button onClick={() => {
              deleteComment(c.id)
            }}>❌</button>
          </Box></Flex>
          } else {
            return c.postId === postId && <li style={{listStyleType: "none"}} key={i}>@<span style={{textDecoration: "underline"}}>{`${name}`}</span>:  {c.text}</li>
          }
        }
        )}
        </>
      )
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

  function onlyDeleteButtonOnUsersPost(){
    if(googleId === usersGoogleId){
      return (
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
      )
    }
  }

  function showCommentsHeader(){
    if(allComments.length !== 0){
      return (
        <h3>Comments:</h3>
      )
    }
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
         {onlyDeleteButtonOnUsersPost()}
        </CardFooter>
        <Center>
          {showCommentsHeader()}
        </Center>

        <Card maxW='md'>
  <CardHeader>
    <Flex >
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar src='https://bit.ly/sage-adebayo' />

        <Box>
          <Heading size='sm'>{`@${name}`}</Heading>
        </Box>
      </Flex>
      <IconButton
        variant='ghost'
        colorScheme='gray'
        aria-label='See menu'
        
      />
    </Flex>
  </CardHeader>
  <CardBody>
    <Text>
    {text}
    </Text>
  </CardBody>
  <Image
    objectFit='cover'
    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    alt='Chakra UI'
  />

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
   
    <Button flex='1' variant='ghost' >
      Comment
    </Button>
<VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={1}
          align='stretch'
        >
         {canOnlyDeleteCommentIfUser()}
        </VStack>
  </CardFooter>
</Card>
        
        {/* <ul>
          {canOnlyDeleteCommentIfUser()}
        </ul> */}
      </Card>
    </ChakraProvider>
  );
}

export default MainFeedPost;
