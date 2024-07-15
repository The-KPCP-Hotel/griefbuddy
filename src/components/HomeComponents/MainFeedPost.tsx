import React, { useState, useEffect } from 'react'

import axios from 'axios';
import { VscSend, VscTrash } from 'react-icons/vsc';
import DeletePostButton from './DeletePostModal';
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  CardFooter,
  Center,
  VStack,
  StackDivider,
  Box,
  Flex,
  Avatar,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

function MainFeedPost(props: any) {
  const toast = useToast();
  type UserType = {
    emConNum: String;
    emConRelationship: String;
    emConName: String;
    currMood: String;
    agee: String;
    googleId: String;
    name: String;
    myLocation: String;
    myPhoneNumber: String;
    preferredName: String;
  };
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUserObj] = useState({} as UserType)
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [commentDeleted, setCommentDeleted] = useState(false)
  const [postDeleted, setPostDeleted] = useState(false)
  const { googleId, postId, name, text, usersGoogleId, setAllPosts, userProfilePic } = props;

  const commentBg = useColorModeValue('whitesmoke', 'gray.800');

  // const buttonBg = useColorModeValue('blue.200', 'blue.600');

  function addComment() {
    // check to see if comment is flagged before posting
    axios.post('/chatbot/moderate', { message: { content: comment } }).then(({ data }) => {
      if (!data) {
        axios
          .post('/mainFeed/addComment', {
            data: {
              googleId,
              user: googleId,
              text: comment,
              postId,
            },
          })
          .then(() => {
            setComment('');
          });
      } else {
        toast({
          title: 'Flagged comment.',
          description: 'Your comment was flagged for inappropriate content and will not send.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  }

  function deletePost() {
    axios
      .delete('/mainFeed/deletePost', {
        data: {
          id: postId,
        },
      })
      .then((results) => {
        setPostDeleted(false)
      })
      .then(() => {
        axios.get('/mainFeed/allPosts').then((results: any) => {
          setAllPosts(results.data);
        });
      });
  }

  useEffect(() => {
    axios.get('/user').then((results: any) => {
      setUserObj(results.data.name)
    })
      .catch((err: Error) => console.error('failed getting user ', err));
  }, []);

  function deleteComment(commentId: Number) {
    axios.delete('/mainFeed/deleteComment', {
      data: {
        id: commentId,
      },
    })
      .then((results) => {
        setCommentDeleted(false)
      })
  }

  function canOnlyDeleteCommentIfUser() {
    return (
      <>
        {allComments.map((c, i) => {
          if (c.postId === postId) {
            if (c.posterName === user) {
              return (
                // (c.postId === postId) && (

                <Box
                  position="relative"
                  key={postId}
                  h="auto"
                  bg={commentBg}
                  w="400px"
                  borderRadius="md"
                  marginBottom="10px"
                  padding="8px"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  @
                  <span style={{ textDecoration: 'underline' }}>{`${name}`}</span>
                  {`: ${c.text}`}
                  <button
                    type="button"
                    style={{ position: 'absolute', right: '20px', top: '4px', padding: '5px' }}
                    // style={{float:"right"}}
                    onClick={() => {
                      deleteComment(c.id);
                    }}
                  >
                    ❌
                  </button>
                </Box>

              );
            }
          }
          return (
            c.postId === postId && (
              <Box
                key={postId}
                h="40px"
                bg={commentBg}
                w="400px"
                borderRadius="md"
                marginBottom="10px"
                padding="8px"
              >
                @
                <span style={{ textDecoration: 'underline' }}>{`${name}`}</span>
                {`: ${c.text}`}
              </Box>
            )
          );
        })}
      </>
    );
  }

  function onlyDeleteButtonOnUsersPost() {
    if (googleId === usersGoogleId) {
      
      return (
      <DeletePostButton onDelete={deletePost}/>        
      );
    }
    return null;
  }

  function showCommentsHeader() {
    if (allComments.length !== 0) {
      return <h3>Comments:</h3>;
    }
    return null;
  }

  // useEffect(() => {

  // }, [postDeleted])

  useEffect(() => {
    axios
      .get('/mainFeed/allComments', {
        data: {
          user: googleId,
          text: comment,
          postId,
        },
      })
      .then((results: any) => {
        const returnedData = results.data;
        setAllComments(returnedData);
        // console.log(returnedData)
      });
  }, [comment, googleId, postId]);

  useEffect(() => {
    axios.get('/mainFeed/allPosts').then((results: any) => {
      setAllPosts(results.data);
    });
  }, [setAllPosts, postDeleted]);


  return (
    <Card maxW="md" w="80vw">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src={userProfilePic} />

            <Box>
              <Heading size="sm">{`@${name}`}</Heading>
            </Box>
          </Flex>
          <Center>
            {onlyDeleteButtonOnUsersPost()}
          </Center>

        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{text}</Text>
      </CardBody>
      {/* <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
      /> */}
      <Center>
        <InputGroup>
          <Input
            placeholder="Add Comment Here"
            width="470px"
            value={comment}
            margin="15px"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <InputRightElement
            margin="15px"
            onClick={() => {
              addComment();
            }}
          >
            <VscSend />
          </InputRightElement>
        </InputGroup>
      </Center>
      {/* <Center>
        <Button
          colorScheme="blue"
          bg={buttonBg}
          color="white"
          margin="8px"
          onClick={() => {
            addComment();
          }}
        >
          Add Comment
        </Button>
      </Center> */}
      <Center>{showCommentsHeader()}</Center>
      <CardFooter
        overflow="scroll"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <VStack divider={<StackDivider borderColor="gray.200" />} spacing={1} align="stretch">
          {canOnlyDeleteCommentIfUser()}
        </VStack>
      </CardFooter>
    </Card>
  );
}

export default MainFeedPost;
