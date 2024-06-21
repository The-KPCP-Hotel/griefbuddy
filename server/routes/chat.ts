import express from 'express';

// having issues getting everything from one import
import { User as UserType, Message as MessageType } from '@prisma/client';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { User, Message } = prisma;

const chat = express.Router();

chat.get('/userSearch', async (req, res) => {
  const { userSearch } = req.query;
  const searchedUsers: UserType[] = await User.findMany({
    where: {
      OR: [
        { name: { contains: userSearch, mode: 'insensitive' } },
        { preferredName: { contains: userSearch, mode: 'insensitive' } },
      ],
    },
  });
  res.send(searchedUsers);
});

chat.get('/user', async (req, res) => {
  const { id } = req.query;
  const user: UserType = await User.findUnique({ where: { id: Number(id) } });
  res.send(user);
});

chat.get('/dms', async (req, res) => {
  const { senderId, recipientId } = req.query;
  const senderNum: number = Number(senderId);
  const recipientNum: number = Number(recipientId);
  const dms: MessageType[] = await Message.findMany({
    where: {
      OR: [
        { senderId: senderNum, recipientId: recipientNum },
        { senderId: recipientNum, recipientId: senderNum },
      ],
    },
  });
  // console.log(dms);
  res.send(dms);
});

export = chat;
