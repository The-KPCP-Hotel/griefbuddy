import React, { useEffect, useState } from 'react';
import { Button, Center, Text, Box } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import axios from 'axios';

function Quote({ userId }: { userId: number }) {
  type Quote = {
    quote: String;
    author: String;
    category: String;
  };

  const [quote, setQuote] = useState({} as Quote);

  const getQuote = () => {
    axios
      .get('/quotes')
      .then(({ data }: { data: { author: String; quote: String; category: String } }) => {
        setQuote(data);
      })
      .catch((err) => console.error('failed getting quote', err));
  };

  useEffect(() => {
    getQuote();
    const quoteRefresh = setInterval(getQuote, 60000);

    return () => clearInterval(quoteRefresh);
  }, []);

  const blockQuote = () => {
    axios.post('/quotes/block', { userId, quote });
    getQuote();
  };

  return (
    <>
      {quote.quote ? (
        <Center>
          <Box>
            <Text fontStyle="italic">{quote.quote}</Text>
            <Text>{`  -${quote.author}`}</Text>
          </Box>
          <Button ml="1rem" variant="ghost" onClick={getQuote}>
            <ArrowRightIcon />
          </Button>
        </Center>
      ) : null}
      {quote.quote ? (
        <Center m="20px">
          <Button type="button" onClick={blockQuote}>
            Don&apos;t show this quote again
          </Button>
        </Center>
      ) : null}
    </>
  );
}

export default Quote;
