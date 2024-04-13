import React = require("react");
import { Link } from "react-router-dom";
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
                    h={"800px"}
                    marginBottom={"150px"}
                    padding={"40px"}
                    >
                    <GridItem width={"300px"} colSpan={1} bg='blue.200'  h='616px' borderRadius={"15px"}>
                        <Center padding={"25px"}>
                            <Avatar name="Kola Tioluwani" size="xl"  src="https://bit.ly/tioluwani-kolawole" />
                        </Center>
                        <Center>
                            <h3>King Tut</h3>
                        </Center>
                        <Center>
                            <h5>CEO of Egypt</h5>
                        </Center>
                        <Center>
                            <h5><b>I Live In:</b> Cairo, Egypt</h5>
                        </Center>
                        <br />
                        <br />
                        <Center>
                            <h5>kingtut2024@gmail.com</h5>
                        </Center>
                    </GridItem>
    
                    <GridItem colSpan={4} bg='blue.200' h='616px' borderRadius={"15px"}>
                    <Tabs isLazy>
                        <TabList paddingTop={"15px"}>
                            <Tab fontSize={"20px"}>About Me</Tab>
                            <Tab fontSize={"20px"}>Friend Contact</Tab>
                            <Tab fontSize={"20px"}>Personal Settings</Tab>
                        </TabList>
                        <TabPanels>
                            {/* initially mounted */}
                            <TabPanel>
                            <Card h={"510px"}>
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
                                    King Tut
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Email
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    kingtut2024@gmail.com
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Age
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    1235 years old
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Current Mental State
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    Not so great...
                                    </Text>
                                </Box>
                                </Stack>
                            </CardBody>
                            </Card>
                            </TabPanel>
                            {/* initially not mounted */}
                            <TabPanel>
                            <Card h={"510px"}>
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
                                    Halle Bot
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Phone Number
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    225-888-8888
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Relationship
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                    Besties
                                    </Text>
                                </Box>
                                </Stack>
                            </CardBody>
                            </Card>
                            </TabPanel>
                            <TabPanel>
                            <FormControl>
                            <Card h={"510px"}>
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
                                    Secondary Email Address
                                    </Heading>
                                    
                                    <Input type='email' />
                                    <FormHelperText>We'll never share your email.</FormHelperText>
                                
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                    Phone Number
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
