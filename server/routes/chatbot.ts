import express, { Request, Response } from 'express';
import main from '../helpers/openai-test';

const chatbot = express.Router();

chatbot.get('/new', async (req: Request, res: Response) => {
  const newChat = await main();
  res.send(newChat);
});

export = chatbot;
