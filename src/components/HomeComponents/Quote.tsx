import React, { useEffect, useState } from 'react';
import { Button, Center, Text, Box, Flex, Spacer, useMediaQuery } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import axios from 'axios';

function Quote({ userId }: { userId: number }) {
  type Quote = {
    quote: String;
    author: String;
    category: String;
  };

  const [quote, setQuote] = useState({} as Quote);

  const [isLargerThanBase] = useMediaQuery('(min-width: 30em)');

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

  if (quote.quote) {
    return isLargerThanBase ? (
      <Center>
        <Box>
          <Text fontStyle="italic">{quote.quote}</Text>
          <Flex maxW="100%" mb=".5rem" mt=".25rem">
            {/* <Box minW="fit-content" p=".5rem"> */}
            <Text pr=".75rem">{`  -${quote.author}`}</Text>
            {/* </Box> */}
            <Spacer />
            {/* <Box p=".5rem"> */}
            <Button type="button" onClick={blockQuote} variant="link" p="0" pt="0">
              Don&apos;t show this quote again
            </Button>
            {/* </Box> */}
          </Flex>
        </Box>
        <Button ml="1rem" variant="ghost" onClick={getQuote}>
          <ArrowRightIcon />
        </Button>
      </Center>
    ) : (
      <Box>
        <Text fontStyle="italic">{quote.quote}</Text>
        <Text>{`  -${quote.author}`}</Text>
        <Center>
          <Button type="button" onClick={blockQuote} variant="link" p="0">
            Don&apos;t show this quote again
          </Button>
          <Button ml="1rem" variant="ghost" onClick={getQuote}>
            <ArrowRightIcon />
          </Button>
        </Center>
      </Box>
    );
  }
}

export default Quote;
