import express, { Request, Response } from 'express';
import path = require('path');
import puppeteer, { HTTPResponse } from 'puppeteer';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const events = express.Router();

events.get('/all', (req: Request, res: Response) => {
  prisma.Event.findMany()
    .then((response: Response) => {
      // console.log(response);
      res.send(response);
    })
    .catch((err: Error) => {
      console.error('failed finding responses', err);
      res.sendStatus(500);
    });
});

events.get('/new', async (req: Request, res: Response) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(
    // tried to add more categories but didn't do anything - is only getting 12...
    // this link should have over a thousand events
    // 'https://www.neworleans.com/events/upcoming-events/',
    'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=102%2C36%2C44%2C31%2C40%2C38%2C34%2C123&startDate=04%2F20%2F2024&endDate=07%2F11%2F2024&sort=title',
    // 'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=42%2C36%2C44%2C31%2C40%2C123&startDate=04%2F11%2F2024&endDate=05%2F11%2F2024&sort=title',
    // 'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=40&startDate=04%2F11%2F2024&endDate=05%2F11%2F2024&sort=title',
  );

  function pageOnResponse(response: HTTPResponse): void {
    // console.log(response);
    if (response.url().includes('find')) {
      // console.log('response.url', response.url());
      response
        .json()
        .then(({ docs: { docs } }) => docs)
        .then((eventsJSON) =>
          eventsJSON.map(
            (event: {
              _id: String;
              linkUrl: String;
              media_raw: Object;
              startDate: String;
              endDate: String;
              address1: String;
              title: String;
              location: String;
              nextDate: String;
              recurrence: String;
            }) => ({
              // eslint-disable-next-line no-underscore-dangle
              OgId: event._id,
              url: event.linkUrl,
              media_raw: event.media_raw,
              startDate: event.startDate,
              endDate: event.endDate ? event.endDate : null,
              nextDate: event.nextDate ? event.nextDate : null,
              address: event.address1 ? event.address1 : 'N/A',
              recurrence: event.recurrence ? event.recurrence : null,
              title: event.title,
              description: event.location,
            }),
          ))
        .then((eventsMapped) =>
          prisma.Event.createMany({
            data: eventsMapped,
            skipDuplicates: true,
          }))
        .then((prismaResponse) => {
          res.send(prismaResponse);
          browser.close();
        })
        .catch((err) => {
          console.error('failed getting events json', err);
          browser.close();
          res.sendStatus(500);
        });
    }
  }

  await page.on('response', pageOnResponse);
});

events.get('/event/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  prisma.event
    .findUnique({ where: { id: Number(id) } })
    .then((eventData: Response) => {
      // console.log(eventData);
      res.send(eventData);
    })
    .catch((err: Error) => {
      console.error('failed finding event', err);
      res.sendStatus(500);
    });
});

const CLIENT_PATH = path.resolve(__dirname, '../../dist');

// thought this would fix blank page on refresh - not quite
events.get('/*', (req, res) => {
  res.sendFile(path.join(CLIENT_PATH, 'index.html'));
});

// this was erroring but stopped?
export = events;
