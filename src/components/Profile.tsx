import React = require('react');
// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
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
  // FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  Input,
  Button,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
// import { UserContext } from '../context/UserContext';

function Profile() {
  type UserType = {
    emConNum: String;
    emConRelationship: String;
    emConName: String;
    currMood: String;
    agee: String;
    googleId: String;
    name: String;
    myLocation: String;
    myPhoneNumber: String;
    preferredName: String;
  };

  // const userContext = useContext(UserContext);
  // const { setUser, user } = userContext;

  // const [googId, setGoogId] = useState('');
  const [userObj, setUserObj] = useState({} as UserType);
  const [friendName, setFriendName] = useState('Halle Bot');
  const [friendNumber, setFriendNumber] = useState('504-XXX-XXXX');
  const [friendRelationship, setFriendRelationship] = useState('Besties?');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('Baton Rouge, LA');
  const [myMood, setMood] = useState("I'm Feeling Great!");
  const [age, setAge] = useState('18-99+');
  const [myPhoneNumber, updateMyPhoneNumber] = useState('2258888888');

  function getUser() {
    axios.get('/profile/user').then((results) => {
      // console.log(results.data[0])
      setUserObj(results.data[0]);
    });
  }

  function updateUser() {
    axios
      .patch('/profile/user', {
        where: {
          googleId: userObj.googleId,
        },
        data: {
          preferredName: nickname,
          currMood: myMood,
          myLocation: location,
          agee: age,
          myPhoneNumber,
        },
      })
      .then(() => {
        console.log('successful patch');
      })
      .catch((err: string) => {
        console.error(err);
      });
  }

  function updateFriend() {
    axios
      .patch('/profile/user', {
        where: {
          googleId: userObj.googleId,
        },
        data: {
          emConName: friendName,
          emConNum: friendNumber,
          emConRelationship: friendRelationship,
        },
      })
      .then(() => {
        console.log('successful patch');
      })
      .catch((err: string) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getUser();
  }, [friendName]);

  useEffect(() => {}, [nickname]);

  return (
    <div>
      <ChakraProvider>
        {/* <Link to="/home" style={{fontSize: "55px"}}>⌂</Link> */}
        <Center>
          <Heading size="3xl" color="blue.200">
            My Profile
          </Heading>
        </Center>
        <Container maxW="7xl">
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
            h="1000px"
            marginBottom="150px"
            padding="40px"
          >
            <GridItem width="300px" colSpan={1} bg="blue.200" h="816px" borderRadius="15px">
              <Center padding="25px">
                <Avatar name="Kola Tioluwani" size="xl" src="https://bit.ly/tioluwani-kolawole" />
              </Center>
              <Center>
                <h3>{userObj.name}</h3>
              </Center>
              <Center>
                <h5>
                  <b>I Live In:</b>
                  {userObj.myLocation}
                </h5>
              </Center>
              <br />
              <br />
            </GridItem>

            <GridItem colSpan={4} bg="blue.200" h="816px" borderRadius="15px">
              <Tabs isLazy>
                <TabList paddingTop="15px">
                  <Tab fontSize="20px">About Me</Tab>
                  <Tab fontSize="20px">Friend Contact</Tab>
                  <Tab fontSize="20px">Personal Settings</Tab>
                </TabList>
                <TabPanels>
                  {/* initially mounted */}
                  <TabPanel>
                    <Card h="710px">
                      <CardHeader>
                        <Heading size="md">About Me</Heading>
                      </CardHeader>

                      <CardBody>
                        <Stack divider={<StackDivider />} spacing="4">
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Name
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {userObj.preferredName}
                            </Text>
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Phone Number
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {userObj.myPhoneNumber}
                            </Text>
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Age
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {userObj.agee}
                            </Text>
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Current Mental State
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {userObj.currMood}
                            </Text>
                          </Box>
                        </Stack>
                      </CardBody>
                    </Card>
                  </TabPanel>
                  {/* initially not mounted */}
                  <TabPanel>
                    <Card h="710px">
                      <CardHeader>
                        <Heading size="md">Friend Contact</Heading>
                      </CardHeader>

                      <CardBody>
                        <Stack divider={<StackDivider />} spacing="4">
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Name
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {userObj.emConName}
                            </Text>
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Phone Number
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {userObj.emConNum}
                            </Text>
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Relationship
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {userObj.emConRelationship}
                            </Text>
                          </Box>
                        </Stack>
                      </CardBody>
                    </Card>
                  </TabPanel>
                  <TabPanel>
                    <FormControl>
                      <Card h="710px" style={{ overflow: 'scroll' }}>
                        <CardHeader>
                          <Heading size="md">Update Personal Settings</Heading>
                        </CardHeader>

                        <CardBody>
                          <Stack divider={<StackDivider />} spacing="4">
                            <Box>
                              <h4 style={{ color: 'orange' }}>Must fill out all boxes</h4>
                              <Heading size="xs" textTransform="uppercase">
                                Preferred Name
                              </Heading>

                              <Input
                                type="text"
                                onChange={(e) => {
                                  const nicknamee = e.target.value;
                                  setNickname(nicknamee);
                                }}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Phone Number
                              </Heading>

                              <Input
                                type="text"
                                onChange={(e) => {
                                  const num = e.target.value;
                                  updateMyPhoneNumber(num);
                                }}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Age
                              </Heading>

                              <Input
                                type="text"
                                onChange={(e) => {
                                  const agee = e.target.value;
                                  setAge(agee);
                                }}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Where I Reside
                              </Heading>

                              <Input
                                type="text"
                                onChange={(e) => {
                                  const locationn = e.target.value;
                                  setLocation(locationn);
                                }}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                How I&apos;m Feeling
                              </Heading>

                              <Input
                                type="text"
                                onChange={(e) => {
                                  const moodd = e.target.value;
                                  setMood(moodd);
                                }}
                              />
                              <Button
                                mt={4}
                                bg="blue.200"
                                onClick={() => {
                                  updateUser();
                                }}
                              >
                                Submit
                              </Button>
                            </Box>
                            <Heading size="md">Update Friend Settings</Heading>
                            <Box>
                              <h4 style={{ color: 'orange' }}>Must fill out all boxes</h4>
                              {' '}
                              <Heading size="xs" textTransform="uppercase">
                                Name
                              </Heading>
                              <Input
                                type="text"
                                onChange={(e) => {
                                  const friendnamee = e.target.value;
                                  setFriendName(friendnamee);
                                }}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Phone Number
                              </Heading>

                              <Input
                                type="text"
                                onChange={(e) => {
                                  const friendnum = e.target.value;
                                  setFriendNumber(friendnum);
                                }}
                              />
                            </Box>
                            <Box>
                              <Heading size="xs" textTransform="uppercase">
                                Your Relation
                              </Heading>

                              <Input
                                type="text"
                                onChange={(e) => {
                                  const relation = e.target.value;
                                  setFriendRelationship(relation);
                                }}
                              />
                              <Button
                                mt={4}
                                bg="blue.200"
                                type="submit"
                                onClick={() => {
                                  updateFriend();
                                }}
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
  );
}

export default Profile;
