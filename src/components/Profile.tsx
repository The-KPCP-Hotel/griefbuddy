import React = require("react");
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, 
    Box, 
    ChakraProvider, 
    Grid, 
    GridItem, 
    Avatar, 
    Center, 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel, 
    Card, 
    CardHeader, 
    CardBody, 
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Heading, Stack, StackDivider, Text } from '@chakra-ui/react'

function Profile() {

    const [googId, setGoogId] = useState('')
    const [userObj, setUserObj] = useState('')
    const [friendName, setFriendName] = useState('Halle Bot')
    const [friendNumber, setFriendNumber] = useState('504-XXX-XXXX')
    const [friendRelationship, setFriendRelationship] = useState('Besties?')
    const [nickname, setNickname] = useState('')
    const [location, setLocation] = useState('Baton Rouge, LA')
    const [myMood, setMood] = useState("I'm Feeling Great!")
    const [age, setAge] = useState('18-99+')

    function getUser() {
        axios.get('/profile/user')
        .then((results) => {
            // console.log(results.data[0])
            setUserObj(results.data[0])
        })
    }

    function updateUser() {
        axios.patch('/profile/user', {
            where: {
                googleId: userObj.name
            },
            data: {
                emConName: friendName,
                emConNum: friendNumber, 
                emConRelationship: friendRelationship,
                preferredName: nickname,
                currMood: myMood,
                myLocation: location
            }
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    return(
            <div>
                <ChakraProvider >
                <Link to="/home" style={{fontSize: "55px"}}>⌂</Link>
                <Center>
                    <Heading size='3xl' color={"blue.200"}>My Profile</Heading>
                </Center>
                <Container maxW="7xl"  >
                     <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(5, 1fr)'
                    gap={4}
                    h={"1000px"}
                    marginBottom={"150px"}
                    padding={"40px"}
                    >
                    <GridItem width={"300px"} colSpan={1} bg='blue.200'  h='816px' borderRadius={"15px"}>
                        <Center padding={"25px"}>
                            <Avatar name="Kola Tioluwani" size="xl"  src="https://bit.ly/tioluwani-kolawole" />
                        </Center>
                        <Center>
                            <h3>{userObj.name}</h3>
                        </Center>
                        <Center>
                            <h5><b>I Live In:</b>{location}</h5>
                        </Center>
                        <br />
                        <br />
                    </GridItem>
    
                    <GridItem colSpan={4} bg='blue.200' h='816px' borderRadius={"15px"}>
                    <Tabs isLazy>
                        <TabList paddingTop={"15px"}>
                            <Tab fontSize={"20px"}>About Me</Tab>
                            <Tab fontSize={"20px"}>Friend Contact</Tab>
                            <Tab fontSize={"20px"}>Personal Settings</Tab>
                        </TabList>
                        <TabPanels>
                            {/* initially mounted */}
                            <TabPanel>
                            <Card h={"710px"} >
                            <CardHeader>
                                <Heading size='md'>About Me</Heading>
                            </CardHeader>

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Name
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    {userObj.name}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Age
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    {age}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Current Mental State
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    {myMood}
                                    </Text>
                                </Box>
                                </Stack>
                            </CardBody>
                            </Card>
                            </TabPanel>
                            {/* initially not mounted */}
                            <TabPanel>
                            <Card h={"710px"}>
                            <CardHeader>
                                <Heading size='md'>Friend Contact</Heading>
                            </CardHeader>

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Name
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    {friendName}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Phone Number
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    {friendNumber}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Relationship
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    {friendRelationship}
                                    </Text>
                                </Box>
                                </Stack>
                            </CardBody>
                            </Card>
                            </TabPanel>
                            <TabPanel>
                            <FormControl>
                            <Card h={"710px"} style={{overflow: "scroll"}}>
                            <CardHeader>
                                <Heading size='md'>Update Personal Settings</Heading>
                            </CardHeader>

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Preferred Name
                                    </Heading>
                                    
                                    <Input type='text' />
                                
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Phone Number
                                    </Heading>
                                    
                                    <Input type='text' />
                                
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Age
                                    </Heading>
                                    
                                    <Input type='text' />
                                
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Where I Reside
                                    </Heading>
                                    
                                    <Input type='text' />
                                
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    How I'm Feeling
                                    </Heading>
                                    
                                    <Input type='text' />
                                    <Button
                                        mt={4}
                                        bg='blue.200'
                                        type='submit'
                                    >
                                        Submit
                                    </Button>
                                </Box>
                                <Heading size='md'>Update Friend Settings</Heading>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Name
                                    </Heading>
                                    
                                    <Input type='text' />
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Phone Number
                                    </Heading>
                                    
                                    <Input type='text' />
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Your Relation
                                    </Heading>
                                    
                                    <Input type='text' />
                                    <Button
                                        mt={4}
                                        bg='blue.200'
                                        type='submit'
                                    >
                                        Submit
                                    </Button>
                                </Box>
                                </Stack>
                            </CardBody>
                            </Card>
                            </FormControl>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    </GridItem>
                    </Grid>
                </Container>
                </ChakraProvider>
            </div>

    
    
            )
}

export default Profile;
