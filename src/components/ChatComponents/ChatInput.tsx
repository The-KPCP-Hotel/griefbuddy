import React from 'react';
import { HStack, Input, Button } from '@chakra-ui/react';

function ChatInput({
  messagesEndRef,
  onChange,
  onPress,
  message,
  onSend,
  id,
}: {
  messagesEndRef: React.MutableRefObject<any>;
  onChange: (e: {
    target: {
      value: string;
      id: string
    };
  }) => void;
  onPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  message: string;
  onSend: () => void;
  id: string;
}) {
  return (
    <HStack ref={messagesEndRef}>
      <Input
        onChange={onChange}
        onKeyDown={onPress}
        value={message}
        id={id}
        placeholder="Start typing here"
      />
      <Button onClick={onSend}>Send</Button>
    </HStack>
  );
}

export default ChatInput;
