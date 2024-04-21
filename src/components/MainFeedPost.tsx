import React = require("react");
import { useState, useEffect } from "react";
import axios from "axios";
import { ChakraProvider,
Card,
CardHeader,
Heading,
CardBody,
Text,
VStack,
CardFooter,
Button
} from "@chakra-ui/react";
function MainFeedPost(props: any) {


    return (
        <ChakraProvider>
            {/* <VStack spacing='4' padding="25px"> */}
  
            <Card key={'lg'} size={'lg'} width="550px" align='center'>
                <CardHeader>
                <Heading size='md'>{props.name}</Heading>
                </CardHeader>
                <CardBody>
                <Text>{props.text}</Text>
                </CardBody>
                <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="white" margin="8px">Add Comment</Button>
                <Button colorScheme='blue' bg="blue.600" color="white" margin="8px">View Comments</Button>
                <Button colorScheme='blue' bg="red" color="white" margin="8px">Delete Post</Button>
            </CardFooter>
            </Card>
            {/* </VStack> */}
        </ChakraProvider>
        )
}

export default MainFeedPost