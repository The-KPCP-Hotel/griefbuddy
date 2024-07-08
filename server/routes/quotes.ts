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

async function getUnblockedQuote(blockedQuotesArray: string[]) {
  const ninjaQuoteResponse = await getQuote();
  if (
    !blockedQuotesArray.includes(ninjaQuoteResponse.data[0]) &&
    ninjaQuoteResponse.data[0].quote.length < 715
  ) {
    return ninjaQuoteResponse.data[0];
  }
  return getUnblockedQuote(blockedQuotesArray);
}

quotes.get(
  '/',
  async (req: { user: { id: number } }, res: { send: Function; sendStatus: Function }) => {
    const userBlockedQuotes = await UserBlockedQuote.findMany({
      where: { userId: req.user.id },
      select: { quote: true },
    });
    const blockedQuotesArray: string[] = [];
    for (let i = 0; i < userBlockedQuotes.length; i += 1) {
      blockedQuotesArray.push(userBlockedQuotes[i].quote.quote);
    }
    const unblockedQuote = await getUnblockedQuote(blockedQuotesArray);
    res.send(unblockedQuote);
  },
);

quotes.post(
  '/block',
  (req: { body: { userId: number; quote: NinjaQuote } }, res: { sendStatus: Function }) => {
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
    })
      .then((dbQuote: QuoteType) => {
        UserBlockedQuote.create({ data: { userId, quoteId: dbQuote.id } }).then(
          (newBlockedQuote: UserBlockedQuoteType) => {
            if (typeof newBlockedQuote !== UserBlockedQuote) {
              res.sendStatus(200);
            } else {
              console.error('newBlockedQuote not created');
              res.sendStatus(500);
            }
          },
        );
      })
      .catch((err: Error) => {
        console.error('failed blocking quote', err);
        res.sendStatus(500);
      });
  },
);

export default quotes;
