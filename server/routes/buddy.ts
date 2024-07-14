import express from 'express';
import { User as UserType, Buddy as BuddyType } from '@prisma/client';

const buddy = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { User, Buddy } = prisma;

function getRandomUserIndex(indexesUnavailable: number[], max: number): number {
  const randomUserIndex = Math.floor(Math.random() * max);
  if (!indexesUnavailable.includes(randomUserIndex) || max <= 1) {
    return randomUserIndex;
  }
  return getRandomUserIndex(indexesUnavailable, max);
}

buddy.post('/new', async (req, res) => {
  // should flag current buddy rows to expired
  // may be able to skip right to the first line of the if block...
  const lastBuddyRound: BuddyType[] = await Buddy.findMany({ where: { expired: false } });
  console.log(lastBuddyRound);
  // change to expired
  if (lastBuddyRound.length) {
    const nowExpiredBuddyRound: BuddyType[] = await Buddy.updateMany({
      where: { expired: false },
      data: { expired: true },
    });
    console.log(nowExpiredBuddyRound);
  }
  // should go through users pairing each with a new buddy - avoiding pairing a user w/ last buddy
  // get all users
  const users: UserType[] = await User.findMany();
  // const usersWOBuddies: UserType[] = [...users];
  const takenIndexes: number[] = [];
  console.log(users);
  // // create paired users array
  // const pairedUsers: UserType[] = [];
  const newBuddies: { buddy1Id: number, buddy2Id: number, expired: boolean }[] = [];
  // iterate through users - while paired users array's length is less than users length
  let index = 0;
  while (users.length > newBuddies.length) {
    // use math random to find user to pair with
    const randomUserIndex = getRandomUserIndex([index, ...takenIndexes], users.length);
    // check buddies originally saved to make sure they weren't paired together last

    newBuddies.push({
      buddy1Id: users[index].id,
      buddy2Id: users[randomUserIndex].id,
      expired: false,
    }, {
      buddy1Id: users[randomUserIndex].id,
      buddy2Id: users[index].id,
      expired: false,
    });
    takenIndexes.push(index, randomUserIndex);
    index += 1;
  }
  // add new buddy rows
  console.log(newBuddies);
  const newBuddyRows = await Buddy.createMany({ data: newBuddies });
  console.log(newBuddyRows);
  res.send(newBuddyRows);
});

export = buddy;
