import express from 'express';

// having issues getting everything from one import
import { User as UserType } from '@prisma/client';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { User } = prisma;

const chat = express.Router();

chat.get('/user', async (req, res) => {
  const searchedUsers: UserType[] = await User.findMany();
  res.send(searchedUsers);
});

export = chat;
