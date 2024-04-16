import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import main from '../helpers/openai-test';

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

export = chatbot;
