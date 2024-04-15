const express = require('express');

const router = express.Router();

const axios = require('axios');

function getQuote() {
  const { NINJA_API_KEY } = process.env;
  console.log(NINJA_API_KEY)
  const quoteUrl = 'https://api.api-ninjas.com/v1/quotes?category=death';
  return axios.get(quoteUrl, { headers: { 'X-Api-Key': NINJA_API_KEY, 'X-Requested-With': 'XMLHttpRequest' } })
    .then((response: Response) => response)
    .catch((err: Error) => console.error('failed getting quote', err));
}

router.get('/', (req: Request, res: { send: Function, sendStatus: Function }) => {
  getQuote()
    .then(({ data }: { data: [ { quote: String, author: String, category: String } ] }) => {
      res.send(data[0]);
    })
    .catch((err: Error) => {
      console.error('failed getting quote', err);
      res.sendStatus(500);
    });
});

module.exports = router;
