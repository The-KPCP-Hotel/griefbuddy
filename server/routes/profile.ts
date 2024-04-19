// import * as express from 'express';
// import { Request, Response } from 'express';
import express, { Request, Response } from 'express';

const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/user', (req: Request, res: Response) => {
  prisma.User.findMany()
    .then((results: any) => {
      res.send(results).status(200);
    })
    .catch((err: string) => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.patch('/user', (req: Request, res: Response) => {
  // const { googleId, location, currMood, friendName, friendNumber, friendRelationship, nickname }
  // = req.body
  console.log('/user req.body', req.body);
  //   prisma.User.updateMany(req.body)
  prisma.User.update(req.body)
    .then((response: Response) => {
      console.log('patch /user prisma update response', response);
      res.status(200).send(response);
    })
    .catch((err: string) => {
      console.error(err);
      res.sendStatus(500);
    });
});

export = router;
