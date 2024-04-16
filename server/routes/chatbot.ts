import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import main from '../helpers/openai-test';

const chatbot = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

// const messageStart = [{ role: 'system', content: 'You are an inquisitive friend to users who are grieving.' }];

chatbot.get('/new', async (req: Request, res: Response) => {
  const newChat = await main();
  res.send(newChat);
});

chatbot.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: req.body.messages,
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
  res.send(chatCompletion.choices[0]);
});

export = chatbot;
