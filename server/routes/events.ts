import express, { Request, Response } from 'express';

import axios, { AxiosResponse } from 'axios';

// import cheerio from 'cheerio';
import puppeteer, { HTTPResponse } from 'puppeteer';

const events = express.Router();

events.get('/', async (req: Request, res: Response) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  // let eventsData: Array<Object>;
  // try {
  await page.goto(
    'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=40&startDate=04%2F11%2F2024&endDate=05%2F11%2F2024&sort=title',
  );

  // eventsData =
  await page.on('response', (response: HTTPResponse) => {
    if (response.url().includes('find')) {
      console.log('response.url', response.url());
      // return response.json().then((jsonResponse) => console.log(jsonResponse));
      return response
        .json()
        .then(({ docs: { docs } }) => docs)
        .then((docs) => {
          setTimeout(() => {
            browser.close();
            console.log('after set timeout and close inside then block');
            res.send(docs);
            // res.sendStatus(200);
          }, 3000);
        });
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
  // } catch (err) {
  //   console.error('failed getting json', err);
  // } finally {
  //   console.log('before close'); // this is logging before the try block
  //   // await browser.close(); // if not getting wanting response this might be stopping it
  //   setTimeout(() => {
  //     browser.close();
  //     console.log('after set timeout and close');
  //     // res.send(eventsData);
  //     res.sendStatus(200);
  //   }, 3000);
  // }
});

export = events;
