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

chat.get('/existingDms', async (req, res) => {
  console.log(req);
  // only need user id
  const { senderId } = req.query;
  const senderNum: number = Number(senderId);
  // find all users that currently have dms with user
  // select name, id, and most recent message
  // figure out how to only select the most recent msg from current chats
  // maybe try to first get only the ids - then a second that only grabs the first from those ids
  const existingDms = await Message.findMany({
    where: { OR: [{ senderId: senderNum }, { recipientId: senderNum }] },
    select: {
      senderId: true,
      recipientId: true,
      msg: true,
      sender: { select: { name: true, preferredName: true } },
      recipient: { select: { name: true, preferredName: true } },
    },
  });

  res.send(existingDms);
});

export = chat;
