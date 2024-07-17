import React from 'react';
import { Heading, Flex, Input, Spacer, Button } from '@chakra-ui/react';

function EditUserInfo({
  heading,
  defaultValue,
  propRef,
  setInfoState,
  updateEditComponentValue,
  updateVal,
  updateUser,
  editInputMode,
  editHeading,
}: {
  heading: String;
  defaultValue: string;
  propRef: React.MutableRefObject<any>;
  setInfoState: (value: React.SetStateAction<string>) => void;
  updateEditComponentValue: (typeClicked: String) => void;
  updateVal: String;
  updateUser: () => void;
  editInputMode: (heading: String) => void;
  editHeading: String;
}) {
  return (
    <>
      <Heading size="xs" textTransform="uppercase">
        {heading}
      </Heading>
      <Flex>
        <Input
          style={{ display: 'inline-block', width: '400px' }}
          defaultValue={defaultValue}
          ref={propRef}
          border={0}
          onChange={(e) => {
            const { value } = e.target;
            setInfoState(value);
          }}
        />
        <Spacer />
        <Button
          marginRight="3px"
          onClick={() => {
            updateEditComponentValue(updateVal);
            updateUser();
          }}
        >
          ✏️
        </Button>
        <Button
          onClick={() => {
            editInputMode(editHeading);
          }}
        >
          ❌
        </Button>
      </Flex>
    </>
  );
}

export default EditUserInfo;
