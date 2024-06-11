import express from 'express';

const chat = express.Router();

chat.get('/user', (req, res) => {
  res.send('success');
});

export = chat;
