import React = require("react");
import { useState, useEffect } from "react";
import axios from "axios";
import MainFeedPost from "./MainFeedPost";
import { ChakraProvider, Center, Heading } from "@chakra-ui/react";
function MainFeed() {


    return (
        <ChakraProvider>
            <div>
            <Center>
                <Heading size="3xl" color="blue.600">Main Feed</Heading>
            </Center>
            <Center>
                <MainFeedPost></MainFeedPost>
            </Center>
            </div>
        </ChakraProvider>
    )
}

export default MainFeed