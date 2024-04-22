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
    const [deleted, setDeleted] = useState('false')

    function addComment() {
        axios.post('/mainFeed/addComment', {
            data: {
                user: props.googleId,
                text: comment,
                postId: props.postId
            }
        })
        .then(() => {
            setComment('')
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
        .then((results: any) => {
            setAllComments(results.data)
        })
    }

    

    function deletePost() {
        axios.delete('/mainFeed/deletePost', {
            data: {
                id: props.postId
            }
        })
        .then(() => {
            setDeleted('true')
        })
    }

    useEffect(() => {
        getAllComments()
    }, [allComments])

    useEffect(() => {
        props.getPosts()
        setDeleted('false')
    }, [deleted])


    


    return (
        <ChakraProvider>  
            <Card key={'lg'} size={'lg'} width="550px" align='center' overflow="scroll">
                <CardHeader>
                <Heading size='md'>@{props.name}</Heading>
                </CardHeader>
                <CardBody>
                <Text>{props.text}</Text>
                </CardBody>
                <Input placeholder="Add Comment Here" width="350px" value={comment}
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
                <Button colorScheme='blue' bg="red" color="white" margin="8px"
                onClick={() => {
                    deletePost()
                }}
                >Delete Post</Button>
            </CardFooter>
                <Center>
                    <h3>Comments:</h3>
                </Center>
                
                <ul>
                    { 
                    allComments.map((comment) => {
                        if(comment.postId === props.postId){
                           return <li>{comment.text}</li>
                        }
                    })}
                <li></li>
                </ul>
                
            </Card>
        </ChakraProvider>
        )
}

export default MainFeedPost