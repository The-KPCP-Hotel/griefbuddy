import React = require("react");
import { useState, useEffect } from "react";
import axios from "axios";
import MainFeedPost from "./MainFeedPost";
import { ChakraProvider, Center } from "@chakra-ui/react";
function MainFeed() {


    return (
        <ChakraProvider>
            <div>
            <Center>
                <MainFeedPost></MainFeedPost>
            </Center>
            </div>
        </ChakraProvider>
    )
}

export default MainFeed