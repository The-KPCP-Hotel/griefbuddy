import { Quote as QuoteType, UserBlockedQuote as UserBlockedQuoteType } from '@prisma/client';

const express = require('express');

const quotes = express.Router();

const axios = require('axios');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { Quote, UserBlockedQuote } = prisma;

type NinjaQuote = {
  quote: string;
  author: string;
  category: string;
};

function getQuote() {
  const { NINJA_API_KEY } = process.env;
  const quoteUrl = 'https://api.api-ninjas.com/v1/quotes?category=inspirational';
  return axios
    .get(quoteUrl, {
      headers: { 'X-Api-Key': NINJA_API_KEY, 'X-Requested-With': 'XMLHttpRequest' },
    })
    .then((response: Response) => response)
    .catch((err: Error) => console.error('failed getting quote', err));
}

quotes.get('/', (req: { user: { id: number } }, res: { send: Function; sendStatus: Function }) => {
  console.log(req.user);
  getQuote()
    .then(({ data }: { data: [NinjaQuote] }) => {
      UserBlockedQuote.findMany({
        where: { userId: req.user.id },
        include: { quote: true },
        // this logs the rows from junction table - want the quote tho
      }).then((userBlockedQuote: UserBlockedQuoteType) => console.log(userBlockedQuote));
      res.send(data[0]);
    })
    .catch((err: Error) => {
      console.error('failed getting quote', err);
      res.sendStatus(500);
    });
});

quotes.post('/block', (req: { body: { userId: number; quote: NinjaQuote } }) => {
  const { userId, quote } = req.body;
  const { author, category } = quote;
  Quote.upsert({
    where: {
      quote: quote.quote,
    },
    update: {},
    create: {
      quote: quote.quote,
      author,
      category,
    },
  }).then((dbQuote: QuoteType) => {
    UserBlockedQuote.create({ data: { userId, quoteId: dbQuote.id } }).then(
      (blocked: UserBlockedQuoteType) => {
        console.log('blocked', blocked);
      },
    );
  });
});

export default quotes;
