import React = require("react");
import { useState, useEffect } from "react";
import axios from "axios";
import { ChakraProvider,
Card,
CardHeader,
Heading,
CardBody,
Text,
Input,
VStack,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
useDisclosure,
Button,
CardFooter,
Center,
} from "@chakra-ui/react";
function MainFeedPost(props: any) {


    const [comment, setComment] = useState('')
    const [allComments, setAllComments] = useState([])
    const [allFilteredComments, setFilteredComments] = useState([])
    function addComment() {
        axios.post('/mainFeed/addComment', {
            data: {
                user: props.googleId,
                text: comment,
                postId: props.postId
            }
        })
    }

    function getAllComments() {
        axios.get('/mainFeed/allComments', {
            data: {
                user: props.googleId,
                text: comment,
                postId: props.postId
            }
        })
    }

    function filterComments() {
        let filteredComments:any = allComments.filter((comment) => {
            return comment.postId === props.postId
        })
        setFilteredComments(filteredComments)
    }

    useEffect(() => {
        getAllComments()
    }, [])

    return (
        <ChakraProvider>
            {/* <VStack spacing='4' padding="25px"> */}
  
            <Card key={'lg'} size={'lg'} width="550px" align='center' overflow="scroll">
                <CardHeader>
                <Heading size='md'>@{props.name}</Heading>
                </CardHeader>
                <CardBody>
                <Text>{props.text}</Text>
                </CardBody>
                <Input placeholder="Add Comment Here" width="350px" 
                onChange={(e) => {
                    setComment(e.target.value)
                }}
                ></Input>
                <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="white" margin="8px" 
                onClick={() => {
                    addComment()
                }}
                >Add Comment</Button>
                <Button colorScheme='blue' bg="red" color="white" margin="8px">Delete Post</Button>
            </CardFooter>
                <Center>
                    <h3>Comments:</h3>
                </Center>
                
                <ul>
                    {/* {allFilteredComments.map((comment) => {
                        <li>{comment.text}</li>
                })} */}
                </ul>
                
            </Card>
            {/* </VStack> */}
        </ChakraProvider>
        )
}

export default MainFeedPost