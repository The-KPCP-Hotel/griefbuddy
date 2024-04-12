import express, {
  Request, Response,
} from 'express';

import axios, {
  AxiosResponse,
} from 'axios';

// import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const events = express.Router();

events.get('/', async (req: Request, res: Response) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto('https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=40&startDate=04%2F11%2F2024&endDate=05%2F11%2F2024&sort=title');

  await page.evaluate(() => {
    const data = document.body.innerHTML;
    console.log(data);
  });

  // page.on('request', (request) => {
  //   console.log('request.url', request.url());
  // });

  await page.on('response', (response) => {
    // contains events json
    console.log('response.url', response.url());
  });

  await browser.close();
  res.sendStatus(200);
});

export = events;
