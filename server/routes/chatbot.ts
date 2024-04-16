import express, { Request, Response } from 'express';
import main from '../helpers/openai-test';

const chatbot = express.Router();

chatbot.get('/new', async (req: Request, res: Response) => {
  const newChat = await main();
  res.send(newChat);
});

chatbot.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.send(req.body);
});

export = chatbot;
