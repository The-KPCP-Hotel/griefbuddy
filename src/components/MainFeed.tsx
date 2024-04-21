import React = require("react");
import { useState, useEffect } from "react";
import axios from "axios";
import MainFeedPost from "./MainFeedPost";
import { ChakraProvider, Center, Heading, VStack } from "@chakra-ui/react";
function MainFeed() {

    const [allPosts, setAllPosts] = useState([])

    function getAllPosts() {
        axios.get('/mainFeed/allPosts')
        .then((results: any) => {
            setAllPosts(results.data)
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
                <VStack>
                {allPosts.map((post) => (
                    <MainFeedPost text={post.text} name={post.name}></MainFeedPost>   
                ))}
                </VStack>
            </Center>
            </div>
        </ChakraProvider>
    )
}

export default MainFeed