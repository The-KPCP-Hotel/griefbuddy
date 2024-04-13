import express, {
  Request, Response,
} from 'express';

// import axios, { AxiosResponse } from 'axios';

import puppeteer, {
  HTTPResponse,
} from 'puppeteer';

const events = express.Router();

events.get('/', async (req: Request, res: Response) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(
    'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=40&startDate=04%2F11%2F2024&endDate=05%2F11%2F2024&sort=title',
  );

  function pageOnResponse(response: HTTPResponse): undefined {
    if (response.url().includes('find')) {
      // console.log('response.url', response.url());
      response
        .json()
        .then(({ docs: { docs } }) => docs)
        .then((eventsJSON) => {
          // this previously needed to be in a setTimeout to not run prematurely
          browser.close();
          res.send(eventsJSON);
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

// have not yet been able to find the proper export solution
export = events;
