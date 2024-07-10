import React, { useEffect, useRef } from 'react';
import { HStack, /* Input, */ Button, Textarea } from '@chakra-ui/react';
import autosize from 'autosize';

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
  const textareaRef = useRef();
  useEffect(() => {
    const curTextareaRef = textareaRef.current;
    autosize(curTextareaRef);
    return () => {
      autosize.destroy(curTextareaRef);
    };
  });

  return (
    <HStack ref={messagesEndRef} mb=".5rem">
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
