import React = require('react');
import { useEffect, useState } from 'react';

import axios from 'axios';

function Quote() {
  type Quote = {
    quote: String,
    author: String
  };

  const [quote, setQuote] = useState({} as Quote);

  useEffect(() => {
    axios.get('/quotes')
      .then(({ data }: { data: { author: String, quote: String } }) => {
        console.log(data);
        setQuote(data);
      })
      .catch((err) => console.error('failed getting quote', err));
  }, []);
  return (
    <h3>{`${quote.quote} -${quote.author}`}</h3>
  );
}

export default Quote;
