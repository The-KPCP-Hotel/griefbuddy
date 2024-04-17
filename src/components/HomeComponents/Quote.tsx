import React = require('react');
import { useEffect, useState } from 'react';
import { ChakraProvider, Button } from '@chakra-ui/react';
import axios from 'axios';

function Quote() {
  type Quote = {
    quote: String,
    author: String
  };

  const [quote, setQuote] = useState({} as Quote);

  const getQuote = () => {
    axios.get('/quotes')
      .then(({ data }: { data: { author: String, quote: String } }) => {
        setQuote(data);
      })
      .catch((err) => console.error('failed getting quote', err));
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <ChakraProvider>
      {(quote.quote) ? <h3>{`${quote.quote} -${quote.author}`}</h3> : <div />}
      <Button type="button" onClick={getQuote}>New Quote</Button>
    </ChakraProvider>
  );
}

export default Quote;
