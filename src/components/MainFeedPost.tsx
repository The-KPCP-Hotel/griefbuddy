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
function MainFeedPost() {


    return (
        <ChakraProvider>
            {/* <Card align='center'>
            <CardHeader>
                <Heading size='md'>Kylan Patton</Heading>
            </CardHeader>
            <CardBody>
                <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="blue.600">View here</Button>
            </CardFooter>
            </Card>
            <Card align='center'>
            <CardHeader>
                <Heading size='md'>Kylan Patton</Heading>
            </CardHeader>
            <CardBody>
                <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="blue.600">View here</Button>
            </CardFooter>
            </Card>
            <Card align='center'>
            <CardHeader>
                <Heading size='md'>Kylan Patton</Heading>
            </CardHeader>
            <CardBody>
                <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
            <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="blue.600">View here</Button>
            </CardFooter>
            </Card> */}
            <VStack spacing='4' padding="25px">
  
            <Card key={'lg'} size={'lg'} width="550px" align='center'>
                <CardHeader>
                <Heading size='md'>Kylan Patton</Heading>
                </CardHeader>
                <CardBody>
                <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, qui.</Text>
                </CardBody>
                <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="white" margin="8px">Add Comment</Button>
                <Button colorScheme='blue' bg="blue.600" color="white" margin="8px">View Comments</Button>
                <Button colorScheme='blue' bg="red" color="white" margin="8px">Delete Post</Button>
            </CardFooter>
            </Card>
            <Card key={'lg'} size={'lg'} width="550px" align='center'>
                <CardHeader>
                <Heading size='md'>Kylan Patton</Heading>
                </CardHeader>
                <CardBody>
                <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, qui.</Text>
                </CardBody>
                <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="white" margin="8px">Add Comment</Button>
                <Button colorScheme='blue' bg="blue.600" color="white" margin="8px">View Comments</Button>
                <Button colorScheme='blue' bg="red" color="white" margin="8px">Delete Post</Button>
            </CardFooter>
            </Card>
            <Card key={'lg'} size={'lg'} width="550px" align='center'>
                <CardHeader>
                <Heading size='md'>Kylan Patton</Heading>
                </CardHeader>
                <CardBody>
                <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, qui.</Text>
                </CardBody>
                <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="white" margin="8px">Add Comment</Button>
                <Button colorScheme='blue' bg="blue.600" color="white" margin="8px">View Comments</Button>
                <Button colorScheme='blue' bg="red" color="white" margin="8px">Delete Post</Button>
            </CardFooter>
            </Card>
            <Card key={'lg'} size={'lg'} width="550px" align='center'>
                <CardHeader>
                <Heading size='md'>Kylan Patton</Heading>
                </CardHeader>
                <CardBody>
                <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, qui.</Text>
                </CardBody>
                <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="white" margin="8px">Add Comment</Button>
                <Button colorScheme='blue' bg="blue.600" color="white" margin="8px">View Comments</Button>
                <Button colorScheme='blue' bg="red" color="white" margin="8px">Delete Post</Button>
            </CardFooter>
            </Card>
            <Card key={'lg'} size={'lg'} width="550px" align='center'>
                <CardHeader>
                <Heading size='md'>Kylan Patton</Heading>
                </CardHeader>
                <CardBody>
                <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, qui.</Text>
                </CardBody>
                <CardFooter>
                <Button colorScheme='blue' bg="blue.200" color="white" margin="8px">Add Comment</Button>
                <Button colorScheme='blue' bg="blue.600" color="white" margin="8px">View Comments</Button>
                <Button colorScheme='blue' bg="red" color="white" margin="8px">Delete Post</Button>
            </CardFooter>
            </Card>
            
            

            </VStack>
        </ChakraProvider>
        )
}

export default MainFeedPost