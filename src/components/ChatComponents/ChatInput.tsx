import React, { useEffect } from 'react';
import { HStack, Button, Textarea } from '@chakra-ui/react';
import autosize from 'autosize';

function ChatInput({
  messagesEndRef,
  textareaRef,
  onChange,
  onPress,
  message,
  onSend,
  id,
}: {
  messagesEndRef: React.MutableRefObject<any>;
  textareaRef: React.MutableRefObject<any>;
  onChange: (e: {
    target: {
      value: string;
      id: string;
    };
  }) => void;
  onPress: (
    e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => void;
  message: string;
  onSend: () => void;
  id: string;
}) {
  useEffect(() => {
    const curTextareaRef = textareaRef.current;
    autosize(curTextareaRef);
    return () => {
      autosize.destroy(curTextareaRef);
    };
  });

  return (
    <HStack ref={messagesEndRef} pb="2rem">
      <Textarea
        minH="2.5rem"
        onChange={onChange}
        onKeyDown={onPress}
        value={message}
        id={id}
        ref={textareaRef}
        placeholder="Start typing here"
      />
      <Button onClick={onSend}>Send</Button>
    </HStack>
  );
}

export default ChatInput;
