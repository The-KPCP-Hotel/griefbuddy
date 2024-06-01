const express = require('express');

const router = express.Router();

const axios = require('axios');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { Quote } = prisma;

function getQuote() {
  const { NINJA_API_KEY } = process.env;
  const quoteUrl = 'https://api.api-ninjas.com/v1/quotes?category=inspirational';
  return axios.get(quoteUrl, { headers: { 'X-Api-Key': NINJA_API_KEY, 'X-Requested-With': 'XMLHttpRequest' } })
    .then((response: Response) => response)
    .catch((err: Error) => console.error('failed getting quote', err));
}

router.get('/', (req: Request, res: { send: Function, sendStatus: Function }) => {
  getQuote()
    .then(({ data }: { data: [ { quote: String, author: String, category: String } ] }) => {
      const { quote, author, category } = data[0];
      Quote.upsert({
        where: {
          quote,
        },
        update: {},
        create: {
          quote,
          author,
          category,
        },
      }).then((response: Response) => console.log(response));
      res.send(data[0]);
    })
    .catch((err: Error) => {
      console.error('failed getting quote', err);
      res.sendStatus(500);
    });
});

export default router;
