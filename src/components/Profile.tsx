import React, { useState, useEffect, useId } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
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
  Input,
  Button,
  Heading,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import PhoneInput from './ProfileComponents/PhoneInput';

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

  const [userObj, setUserObj] = useState({} as UserType);
  const [friendName, setFriendName] = useState('Halle Bot');
  const [friendNumber, setFriendNumber] = useState('504-XXX-XXXX');
  const [friendRelationship, setFriendRelationship] = useState('Besties?');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('Baton Rouge, LA');
  const [myMood, setMood] = useState("I'm Feeling Great!");
  const [age, setAge] = useState('18-99+');
  const [myPhoneNumber, updateMyPhoneNumber] = useState('2258888888');

  const contactWarningId = useId();

  const bg = useColorModeValue('blue.200', 'blue.600');

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
      .then((response) => {
        setUserObj(response.data);
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
      .then((response) => {
        setUserObj(response.data);
      })
      .catch((err: string) => {
        console.error(err);
      });
  }

  useEffect(() => {
    axios.get('/user').then(({ data }) => {
      const refreshObj = { ...data };
      setUserObj(refreshObj);
    });
  }, []);

  useEffect(() => {}, [nickname]);

  return (
    <div>
      <Container maxW="7xl" h="550px">
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
          h="1000px"
          marginBottom="150px"
          padding="40px"
        >
          <GridItem width="300px" colSpan={1} bg={bg} h="616px" borderRadius="15px">
            <Center padding="25px">
              <Avatar name="Kola Tioluwani" size="xl" src="https://bit.ly/tioluwani-kolawole" />
            </Center>
            <Center>
              {userObj ? <h3 style={{ fontSize: '28px' }}>{userObj.name}</h3> : <div />}
            </Center>
            <Center>
              <h5>
                <b>I Live In: </b>
                {userObj ? userObj.myLocation : ''}
              </h5>
            </Center>
            <br />
            <br />
          </GridItem>

          <GridItem colSpan={4} bg={bg} h="616px" borderRadius="15px">
            <Tabs isLazy>
              <TabList paddingTop="15px">
                <Tab fontSize="20px">About Me</Tab>
                <Tab fontSize="20px">Friend Contact</Tab>
                <Tab fontSize="20px">Personal Settings</Tab>
              </TabList>
              <TabPanels>
                {/* initially mounted */}
                <TabPanel>
                  <Card h="500px">
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing="4">
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Name
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {userObj ? userObj.preferredName : ''}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Phone Number
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {userObj ? userObj.myPhoneNumber : ''}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Age
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {userObj ? userObj.agee : ''}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Current Mental State
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {userObj ? userObj.currMood : ''}
                          </Text>
                        </Box>
                      </Stack>
                    </CardBody>
                  </Card>
                </TabPanel>
                {/* initially not mounted */}
                <TabPanel>
                  <Card h="500px">
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing="4">
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Name
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {userObj ? userObj.emConName : ''}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Phone Number
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {userObj ? userObj.emConNum : ''}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Relationship
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {userObj ? userObj.emConRelationship : ''}
                          </Text>
                        </Box>
                      </Stack>
                    </CardBody>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <FormControl>
                    <Card h="500px" style={{ overflow: 'scroll' }}>
                      <CardHeader>
                        <Heading size="md">Update Personal Settings</Heading>
                      </CardHeader>

                      <CardBody>
                        <Stack divider={<StackDivider />} spacing="4">
                          <Box>
                            <Text style={{ color: 'orange' }}>Must fill out all boxes</Text>
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
                          <PhoneInput setNumber={updateMyPhoneNumber} />
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
                              bg={bg}
                              onClick={() => {
                                updateUser();
                              }}
                            >
                              Submit
                            </Button>
                          </Box>
                          <Heading aria-describedby={contactWarningId} size="md">
                            Update Friend Settings
                          </Heading>
                          <Box>
                            <Text style={{ color: 'orange' }}>Must fill out all boxes</Text>
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
                          <PhoneInput setNumber={setFriendNumber} />
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
                            <Heading id={contactWarningId} size="xs" color="red">
                              If submitted, we will send your friend an SMS upon any alarming
                              behavior.
                            </Heading>
                            <Button
                              mt={4}
                              bg={bg}
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
    </div>
  );
}

export default Profile;
