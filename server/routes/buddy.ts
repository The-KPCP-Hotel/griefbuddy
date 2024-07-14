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
  // keep last buddy round to make sure users aren't getting repaired with same buddy
  const lastBuddyRound: BuddyType[] = await Buddy.findMany({ where: { expired: false } });
  // change to expired
  if (lastBuddyRound.length) {
    await Buddy.updateMany({
      where: { expired: false },
      data: { expired: true },
    });
  }
  // should go through users pairing each with a new buddy - avoiding pairing a user w/ last buddy

  // get all users
  const users: UserType[] = await User.findMany();
  const takenIndexes: number[] = [];
  const newBuddies: { buddy1Id: number; buddy2Id: number; expired: boolean }[] = [];
  // if users is odd - add my second account to taken indexes and its own new buddy
  if (users.length % 2 !== 0) {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].googleId === '107960153562210147940') {
        takenIndexes.push(i);
        newBuddies.push({ buddy1Id: i, buddy2Id: i, expired: false });
        break;
      }
    }
  }
  // iterate through users - while paired users array's length is less than users length
  let index = 0;
  while (users.length > newBuddies.length) {
    // use math random to find user to pair with
    const randomUserIndex = getRandomUserIndex([index, ...takenIndexes], users.length);
    // check buddies originally saved to make sure they weren't paired together last

    newBuddies.push(
      {
        buddy1Id: users[index].id,
        buddy2Id: users[randomUserIndex].id,
        expired: false,
      },
      {
        buddy1Id: users[randomUserIndex].id,
        buddy2Id: users[index].id,
        expired: false,
      },
    );
    takenIndexes.push(index, randomUserIndex);

    index += 1;
  }
  // add new buddy rows
  // console.log(newBuddies);
  const newBuddyRows = await Buddy.createMany({ data: newBuddies });
  res.send(newBuddyRows);
});

export = buddy;
