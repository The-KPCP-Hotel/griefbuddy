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
  const [friendName, setFriendName] = useState('Halle Bot');
  const [friendNumber, setFriendNumber] = useState('504-XXX-XXXX');
  const [friendRelationship, setFriendRelationship] = useState('Besties?');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('Baton Rouge, LA');
  const [myMood, setMood] = useState("I'm Feeling Great!");
  const [age, setAge] = useState('Add age here');
  const [myPhoneNumber, updateMyPhoneNumber] = useState('2258888888');
  const [myNameEditClicked, setMyNameEditClicked] = useState(false)
  const [myNumberEditClicked, setMyNumberEditClicked] = useState(false)
  const [myAgeEditClicked, setMyAgeEditClicked] = useState(false)
  const [myMoodEditClicked, setMyMoodEditClicked] = useState(false)
  const [userPic, setUserPic] = useState('')
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

  function doubleClickOnInput(heading: String) {
    if (myNameEditClicked === false && heading === "Preferred Name") {
      return (
       <>
          <Heading size="xs" textTransform="uppercase">
            {heading}
          </Heading>
           <Flex>
          <Text pt="2" fontSize="sm" display={"inline"} onDoubleClick={() => {
            setMyNameEditClicked(true)
          }}>
            {userObj ? userObj.name : <Input style={{ display: "inline-block", width: "400px" }} placeholder={`Update ${heading}`} border={0} />
}
          </Text>
        </Flex>
        </>
      )
    } else if(myNumberEditClicked === false && heading === "Phone Number") {
      return (
        <>
           <Heading size="xs" textTransform="uppercase">
             {heading}
           </Heading>
            <Flex>
           <Text pt="2" fontSize="sm" display={"inline"} onDoubleClick={() => {
             setMyNumberEditClicked(true)
           }}>
             {userObj ? userObj.myPhoneNumber : <Input style={{ display: "inline-block", width: "400px" }} placeholder={`Update ${heading}`} border={0} />
}
           </Text>
         </Flex>
         </>
       )
    } else if(myAgeEditClicked === false && heading === "Age"){
      return (
        <>
           <Heading size="xs" textTransform="uppercase">
             {heading}
           </Heading>
            <Flex>
           <Text pt="2" fontSize="sm" display={"inline"} onDoubleClick={() => {
             setMyAgeEditClicked(true)
           }}>
             {userObj ? userObj.agee : <Input style={{ display: "inline-block", width: "400px" }} placeholder={`Update ${heading}`} border={0} />
}
           </Text>
         </Flex>
         </>
       )
    } else if(myMoodEditClicked === false && heading === "Current Mental State") {
      return (
        <>
           <Heading size="xs" textTransform="uppercase">
             {heading}
           </Heading>
            <Flex>
           <Text pt="2" fontSize="sm" display={"inline"} onDoubleClick={() => {
             setMyMoodEditClicked(true)
           }}>
             {userObj ? userObj.currMood : <Input style={{ display: "inline-block", width: "400px" }} placeholder={`Update ${heading}`} border={0} />
}
           </Text>
         </Flex>
         </>
       )
    }
    
    else {
      return (
        <>
          <Heading size="xs" textTransform="uppercase">
            {heading}
          </Heading>
          <Flex>
          <Input style={{ display: "inline-block", width: "400px" }} placeholder={`Update ${heading}`} border={0} />
          <Spacer />
          <Button>✏️</Button>
        </Flex>
        </>
      )
    }

  }

  function sendUpdateOnClick() {

  }


  function inputReturnBasedOffInputType() {
    
  }


  useEffect(() => {
    axios.get('/user').then(({ data }) => {
      const refreshObj = { ...data };
      setUserObj(refreshObj);
    });
  }, []);

  useEffect(() => {}, [nickname, myNameEditClicked, myAgeEditClicked, myNumberEditClicked, myMoodEditClicked]);


  useEffect(() => {
    axios
      .get('/user')
      .then((results: any) => {
          // const curUser = { ...results };
          console.log(results.userPicture, "heyyy")
          setUserPic(results.userPicture)
        
      })
      .catch((err: Error) => console.error('failed getting user pic', err));
  }, []);

  // useEffect(() => {
  // }, [selfEditClicked])
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
          <GridItem  w={{base: "80vw", lg: "300px"}} colSpan={1} bg={bg} h="420px" borderRadius="15px">
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

            <GridItem w={{base: "80vw", lg:"800px" }} colSpan={{base: 6, lg: 1}} bg={bg} h="420px" borderRadius="15px">
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
                          {doubleClickOnInput("Phone Number")}
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
