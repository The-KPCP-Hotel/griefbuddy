import React, { useEffect, useState } from 'react';
import { Button, Center, Text, Box } from '@chakra-ui/react';
import axios from 'axios';

function Quote() {
  type Quote = {
    quote: String;
    author: String;
  };

  const [quote, setQuote] = useState({} as Quote);

  const getQuote = () => {
    axios
      .get('/quotes')
      .then(({ data }: { data: { author: String; quote: String } }) => {
        setQuote(data);
      })
      .catch((err) => console.error('failed getting quote', err));
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <>
      {quote.quote ? (
        <Center>
          <Box>
            <Text fontStyle="italic">{quote.quote}</Text>
            <Text>{`  -${quote.author}`}</Text>
          </Box>
        </Center>
      ) : null}
      <Center m="20px">
        <Button type="button" onClick={getQuote}>
          New Quote
        </Button>
      </Center>
    </>
  );
}

export default Quote;
