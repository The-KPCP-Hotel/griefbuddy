import React = require("react");
import { useState, useEffect } from "react";
import axios from "axios";
import MainFeedPost from "./MainFeedPost";
import { ChakraProvider,
    Center,
    Heading,
    Input,
    VStack, 
    Button} from "@chakra-ui/react";
function MainFeed(props: any) {

    const [allPosts, setAllPosts] = useState([])
    const [postMessage, setPostMessage] = useState('')

    function getAllPosts() {
        console.log(props.user)
        axios.get('/mainFeed/allPosts')
        .then((results: any) => {
            setAllPosts(results.data)
        })
    }

    function addPost() {
        axios.post('/mainFeed/addPost', {
            data: {
                user: props.googleId,
                text: postMessage
            }
        })
    }

    
    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <ChakraProvider>
            <div>
            <Center>
                <Heading size="3xl" color="blue.600">Main Feed</Heading>
            </Center>
            <Center>
                <Input placeholder="Add Post Here" onChange={(e) => {
                    setPostMessage(e.target.value)
                }}></Input>
            </Center>
            <Center>
                <Button margin="25px" onClick={() => {
                    addPost()
                }}>Submit Post</Button>
            </Center>
            <Center>
                <VStack>
                {allPosts.map((post) => (
                    <MainFeedPost text={post.text} name={post.name} googleId={props.googleId} postId={post.id}></MainFeedPost>   
                ))}
                </VStack>
            </Center>
            </div>
        </ChakraProvider>
    )
}

export default MainFeed