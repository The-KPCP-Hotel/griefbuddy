import express, { Request, Response } from 'express';

const chatbot = express.Router();

chatbot.get('/new', (req: Request, res: Response) => {
  res.sendStatus(200);
});

export = chatbot;
