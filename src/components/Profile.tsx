import React, { useState, useEffect, useId, useRef } from 'react';
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
  ButtonGroup,
  Editable,
  EditablePreview,
  EditableInput,
  Flex,
  Spacer,
  HStack,
  useEditableControls,
  IconButtonProps,
  IconButton
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
  const [friendName, setFriendName] = useState("Add your friend's name here");
  const [friendNumber, setFriendNumber] = useState('504-XXX-XXXX');
  const [friendRelationship, setFriendRelationship] = useState('Besties?');
  const [nickname, setNickname] = useState('What name would you prefer to be addressed by?');
  const [location, setLocation] = useState('Add your city or state here');
  const [myMood, setMood] = useState("What is your current mental state?");
  const [age, setAge] = useState('Add age here');
  const [myPhoneNumber, updateMyPhoneNumber] = useState('Add your phone number here');
  const [userPic, setUserPic] = useState('')
  const [inInputEditMode, setInputEditMode] = useState(false)
  const [inAgeInputEditMode, setAgeInputEditMode] = useState(false)
  const [inPhoneInputEditMode, setPhoneInputEditMode] = useState(false)
  const [inMoodInputEditMode, setMoodInputEditMode] = useState(false)
  const contactWarningId = useId();

  const inputValRef = useRef(null)
  const inputAgeValRef = useRef(null)
  const inputPhoneValRef = useRef(null)
  const inputMoodValRef = useRef(null)
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
        setNickname(response.data.preferredName)
        setAge(response.data.agee)
        updateMyPhoneNumber(response.data.myPhoneNumber)
        setMood(response.data.currMood)
        console.log(response.data)
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

  function updateEditComponentValue(typeClicked: String) {
    if (typeClicked === "name") {
      setInputEditMode(false)
      setNickname(inputValRef.current.value)
    }
    // else if(typeClicked === "number"){
    // if(typeClicked === "name"){
    //   setInputEditMode(false)
    //   setNickname(inputValRef.current.value)
    //  else if(typeClicked === "number"){
    //   setPhoneInputEditMode(false)
    //   updateMyPhoneNumber(inputPhoneValRef.current.value)
    //  }
    else if (typeClicked === "age") {
      setAgeInputEditMode(false)
      setAge(inputAgeValRef.current.value)
    }
    else if(typeClicked === "mood"){
      setMoodInputEditMode(false)
      setMood(inputMoodValRef.current.value)
    }
  }

  function editInputMode(heading: String) {
    console.log("is in edit mode")
    if (heading === "Preferred Name") {
      setInputEditMode(!inInputEditMode)
    }
    if (heading === "age") {
      setAgeInputEditMode(!inAgeInputEditMode)
    }
    if(heading === "number"){
      setPhoneInputEditMode(!inPhoneInputEditMode)
    }
    if(heading === "mood"){
      setMoodInputEditMode(!inMoodInputEditMode)
    }
  }

  function displayInputEdit(heading: String) {
    if (heading === "Preferred Name") {
      return (
        <>
          <Heading size="xs" textTransform="uppercase">
            {heading}
          </Heading>
          <Flex>
            <Input style={{ display: "inline-block", width: "400px" }} defaultValue={nickname} ref={inputValRef} border={0}
              onChange={(e) => {
                const nicknamee = e.target.value;
                setNickname(nicknamee);
              }}
            />
            <Spacer />
            <Button marginRight="3px" onClick={() => {
              updateEditComponentValue("name");
              updateUser()
            }}>✏️</Button>
            <Button onClick={() => {
              editInputMode("Preferred Name")
            }}>❌</Button>
          </Flex>
        </>
      )
    }
    if (heading === "Phone Number") {
      return (
        <>
          <Heading size="xs" textTransform="uppercase">
            {heading}
          </Heading>
          <Flex>
            <Input style={{ display: "inline-block", width: "400px" }} defaultValue={myPhoneNumber} ref={inputPhoneValRef} border={0}
            />
            <Spacer />
            <Button marginRight="3px" onClick={() => {
              updateEditComponentValue("number");
              updateUser()
            }}>✏️</Button>
            <Button onClick={() => {
              editInputMode("number")
            }}>❌</Button>
          </Flex>
        </>
      )
    }
    if (heading === "Age") {
      return (
        <>
          <Heading size="xs" textTransform="uppercase">
            {heading}
          </Heading>
          <Flex>
            <Input style={{ display: "inline-block", width: "400px" }} defaultValue={age} ref={inputAgeValRef} border={0}
              onChange={(e) => {
                const agee = e.target.value;
                setAge(agee);
              }}
            />
            <Spacer />
            <Button marginRight="3px" onClick={() => {
              updateEditComponentValue("age");
              updateUser()
            }}>✏️</Button>
            <Button onClick={() => {
              editInputMode("age")
            }}>❌</Button>
          </Flex>
        </>
      )
    }
    else if (heading === "Current Mental State") {
      return (
        <>
          <Heading size="xs" textTransform="uppercase">
            {heading}
          </Heading>
          <Flex>
            <Input style={{ display: "inline-block", width: "400px" }} defaultValue={myMood} ref={inputMoodValRef} border={0}
            onChange={(e) => {
              const moodd = e.target.value;
              setMood(moodd);
            }}
            />
            <Spacer />
            <Button marginRight="3px" onClick={() => {
              updateEditComponentValue("mood");
              updateUser()
            }}>✏️</Button>
            <Button onClick={() => {
              editInputMode("mood")
            }}>❌</Button>
          </Flex>
        </>
      )
    }
  }

  function displayInputDefault(heading: String) {
    if (heading === "Preferred Name") {

      return (
        <>
          <Heading size="xs" textTransform="uppercase">
            {heading}
          </Heading>
          <Flex>
            <Text pt="2" fontSize="sm" display={"inline"} onDoubleClick={() => {
              editInputMode("Preferred Name")
            }}>
              {userObj.preferredName ? userObj.preferredName : userObj.name}
            </Text>
          </Flex>
        </>
      )
    }
    if (heading === "Age") {

      return (
        <>
          <Heading size="xs" textTransform="uppercase">
            {heading}
          </Heading>
          <Flex>
            <Text pt="2" fontSize="sm" display={"inline"} onDoubleClick={() => {
              editInputMode("age")
            }}>
              {userObj.agee ? userObj.agee : age
              }
            </Text>
          </Flex>
        </>
      )
    }
    if(heading === "Phone Number"){

      return (
        <>
          <Heading size="xs" textTransform="uppercase">
            {heading}
          </Heading>
          <Flex>
            <Text pt="2" fontSize="sm" display={"inline"} onDoubleClick={() => {
              editInputMode("number")
            }}>
              {userObj.myPhoneNumber ? userObj.myPhoneNumber :  myPhoneNumber
            }  
            </Text>
          </Flex>
        </>
      )
    }
    if(heading === "Current Mental State"){

      return (
        <>
          <Heading size="xs" textTransform="uppercase">
            {heading}
          </Heading>
          <Flex>
            <Text pt="2" fontSize="sm" display={"inline"} onDoubleClick={() => {
              editInputMode("mood")
            }}>
              {userObj.currMood ? userObj.currMood : myMood
            }  
            </Text>
          </Flex>
        </>
      )
    }
  }

  function doubleClickOnInput(heading: String) {
    if (heading === "Preferred Name") {
      return inInputEditMode ? displayInputEdit("Preferred Name") : displayInputDefault("Preferred Name")
    }
    if (heading === "Age") {
      return inAgeInputEditMode ? displayInputEdit("Age") : displayInputDefault("Age")

    }
    if(heading === "Current Mental State"){
      return inMoodInputEditMode ? displayInputEdit("Current Mental State") : displayInputDefault("Current Mental State")

    } 
  }
  useEffect(() => {
    axios.get('/user').then(({ data }) => {
      const refreshObj = { ...data };
      setUserObj(refreshObj);
    });
  }, []);

  useEffect(() => { }, [nickname, age, myMood]);


  useEffect(() => {
    axios
      .get('/user')
      .then((results: any) => {
        setUserPic(results.data.userPicture)
        console.log(results)
        setNickname(results.data.preferredName)
        setAge(results.data.agee)
        setMood(results.data.currMood)
      })
      .catch((err: Error) => console.error('failed getting user pic', err));
  }, []);


  return (
    <div>
      <Container maxW="7xl" h="550px" >
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
          h="1000px"
          marginBottom="150px"
          paddingTop="40px"
          paddingLeft="30px"
        >
          <GridItem w={{ base: "80vw", lg: "300px" }} colSpan={1} bg={bg} h="420px" borderRadius="15px">
            <Center padding="25px">
              <Avatar name="Kola Tioluwani" size="xl" src={userPic} />
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

          <GridItem w={{ base: "80vw", lg: "800px" }} colSpan={{ base: 6, lg: 1 }} bg={bg} h="420px" borderRadius="15px">
            <Tabs isLazy>
              <TabList paddingTop="15px">
                <Tab fontSize="20px">About Me</Tab>
                <Tab fontSize="20px">Friend Contact</Tab>
                <Tab fontSize="20px">Personal Settings</Tab>
              </TabList>
              <TabPanels>
                {/* initially mounted */}
                <TabPanel>
                  <Card h="320px">
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing="4">
                        <Box>
                          {doubleClickOnInput("Preferred Name")}
                        </Box>
                        <Box>
                          {/* {doubleClickOnInput("Phone Number")} */}
                        </Box>
                        <Box>
                          {doubleClickOnInput("Age")}
                        </Box>
                        <Box>
                          {doubleClickOnInput("Current Mental State")}
                        </Box>
                      </Stack>
                    </CardBody>
                  </Card>
                </TabPanel>
                {/* initially not mounted */}
                <TabPanel>
                  <Card h="80%">

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
                    <Card h="300px" style={{ overflow: 'scroll' }}>
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
