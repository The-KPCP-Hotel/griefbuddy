import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Heading,
  Center,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  Box,
  UnorderedList,
  Container,
  useColorModeValue,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';


function Resources() {
  const [griefObj, setGriefObj] = useState([]);
  const [griefObjTypes, setGriefObjTypes] = useState([]);
  const [generalBereavementResources, setGeneralResources] = useState([]);
  const [clickedGriefType, setClickedGriefType] = useState('');
  const [dropdownLabel, setDropdownLabel] = useState('Pick a Grief Type');
  const [griefStrSplit, setGriefStrSplit] = useState([]);
  // string that is split and matches type clicked
  const [griefStrSplitH3, setGriefStrSplitH3] = useState('');
  const [typeUpdateStatus, setUpdateStatus] = useState('false');

  const bg = useColorModeValue('blue.200', 'blue.600');

  function getTypesOfGrief() {
    axios.get('/resources/addResource').then((results: AxiosResponse) => {
      // console.log(results.data)
      setGriefObj(results.data);
      setGeneralResources(results.data[0].resources)
      console.log(results.data[0].resources)
      // setGriefStrSplit(results.data.allResources[0].split('<h3>'));
      let specificGriefTypes = results.data
      // specificGriefTypes.shift()
      setGriefObjTypes(specificGriefTypes);
    });
  }

  function onGriefTypeClick(type: any) {
    setClickedGriefType(type);
  }


  function parseObj() {
    if (clickedGriefType === '') {


      return generalBereavementResources.map((resource, i) => (

        <Card key={i}
          direction={{ base: 'column', sm: 'row' }}
          overflow='scroll'
          variant='outline'
          h="300px"
          width="80%"
        >
          <Stack>
            <CardBody>
              <Heading size='md'>{resource.name}</Heading>

              <Text py='2'>
               {resource.description}
              </Text>
            </CardBody>

            <CardFooter>
              <Button variant='solid' colorScheme='blue'>
                <a href={resource.url} target='_blank'>Link to Resource</a>
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      ))

    }
  }

  function clickedTypeH3Return(type: any) {
    for (let i = 0; i < griefObj.length; i++) {
      if (griefObj[i].title === type) {
        setGriefStrSplitH3(griefObj[i].title);
      }
    }
  }

  // function parseAndReturnH3() {
  //   const concated = '<h3>';
  //   return (
  //     <div className='IndividualResource' style={{textAlign: 'center', lineHeight: '45px'}} dangerouslySetInnerHTML={{__html: concated.concat(griefStrSplitH3)}}></div>
  //   )
  //   }

  function nonGeneralResources() {
    for(let i = 0; i < griefObj.length; i++){
      if(griefObj[i].title === griefStrSplitH3) {

        return griefObj[i].resources.map((resource: any = { }, i: number) => (

          <Card key={i}
            direction={{ base: 'column', sm: 'row' }}
            overflow='scroll'
            variant='outline'
            h="300px"
            width="80%"
          >
            <Stack>
              <CardBody>
                <Heading size='md'>{resource.name}</Heading>
  
                <Text py='2'>
                 {resource.description}
                </Text>
              </CardBody>
  
              <CardFooter>
                <Button variant='solid' colorScheme='blue'>
                  <a href={resource.url} target='_blank'>Link to Resource</a>
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        ))
      }
    }
  }

  useEffect(() => {
    getTypesOfGrief();
  }, []);

  useEffect(() => {
    setUpdateStatus('false');
  }, [clickedGriefType]);

  return (
    <>
      <Center>
        <Heading size="3xl" color="blue.200" marginBottom="35px" marginTop="50px">
          <InfoIcon />
        </Heading>
      </Center>
      <Container maxW="7xl">
        <Center>
          <Menu>
            <MenuButton as={Button} rightIcon={<>⌵</>}>
              {dropdownLabel}
            </MenuButton>
            <MenuList>
              {griefObj.map((griefObjTypes, i) => (
                <MenuItem
                  key={i}
                  onClick={(e: any) => {
                    onGriefTypeClick(e.target.innerText);
                    clickedTypeH3Return(e.target.innerText);
                    setDropdownLabel(e.target.innerText);
                    setUpdateStatus('true');
                  }}
                >
                  {griefObjTypes.title}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Center>
        <br />
        <br />
        <Center>
          {/* <Box
            h="575px"
            bg={bg}
            padding="25px"
            borderRadius="15px"
            overflow="scroll" w="80vw"
          >
            <UnorderedList className="h3outputs">
              {/* {parseObj()}
              {parseAndReturnH3()} */}
          {/* </UnorderedList>
          </Box> */ }
          <VStack marginBottom="50px">
            {parseObj()}
            {nonGeneralResources()}
          </VStack>
        </Center>
      </Container>
    </>
  )
}

export default Resources;
