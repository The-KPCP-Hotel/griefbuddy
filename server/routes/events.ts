import express, { Request, Response } from 'express';

import axios, { AxiosResponse } from 'axios';

// import cheerio from 'cheerio';
import puppeteer, { HTTPResponse } from 'puppeteer';

const events = express.Router();

events.get('/', async (req: Request, res: Response) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  try {
    await page.goto(
      'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=40&startDate=04%2F11%2F2024&endDate=05%2F11%2F2024&sort=title',
    );

    // await page.evaluate(() => {
    //   const data = document.body.innerHTML;
    //   console.log(data);
    // });

    // await page.on('request', (request) => {
    //   console.log('request.url', request.url());
    // });

    await page.on('response', (response: HTTPResponse) => {
      if (response.url().includes('find')) {
        console.log('response.url', response.url());
        return response.url();
      }
      // contains events json -- but not on every call - happening less and less?
      // console.log('response.url', response.url());
      // console.log('in on');

      // response.json()
      //   .then((jsonResponse) => {
      //     console.log(jsonResponse.data);
      //   })
      //   .catch((err) => console.error('failed getting json', err));
      // console.log(json);
    });
  } catch (err) {
    console.error('failed getting json', err);
  } finally {
    console.log('before close'); // this is logging before the try block
    // await browser.close(); // if not getting wanting response this might be stopping it
    setTimeout(() => {
      browser.close();
      console.log('after set timeout and close');
      res.sendStatus(200);
    }, 3000);
    // res.sendStatus(200);
  }
});

export = events;
