import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import main from '../helpers/openai-test';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const chatbot = express.Router();

const openai = new OpenAI({
  // This is the default and can be omitted - if you globally exported your api key
  apiKey: process.env.OPENAI_API_KEY,
});

chatbot.get('/new', async (req: Request, res: Response) => {
  const newChat = await main();
  res.send(newChat);
});

chatbot.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  // was trying to make main() dynamic bug was having issues with messages type
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: req.body.messages,
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
  res.send(chatCompletion.choices[0]);
});

type OpenaiMessageType = {
  role: string;
  content: string;
};

chatbot.post('/db1', (req: Request, res: Response) => {
  const { userId, messages } = req.body;

  const dbMessages = messages.map((message: OpenaiMessageType) => ({ ...message, userId }));
  prisma.BotMessage.createMany({ data: dbMessages })
    .then((response: Response) => res.send(response))
    .catch((err: Error) => console.error('failed first bot db post', err));
});

chatbot.post('/db', (req: Request, res: Response) => {
  const { userId, message } = req.body;
  prisma.BotMessage.create({ data: { ...message, userId } })
    .then((response: Response) => res.send(response))
    .catch((err: Error) => console.error('failed bot db post', err));
});

chatbot.get('/convo', (req: Request, res: Response) => {
  const { userId } = req.body;
  prisma.BotMessage.findMany({ where: { userId } })
    .then((response: Response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err: Error) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export = chatbot;
