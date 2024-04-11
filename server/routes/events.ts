import express, {
  Request, Response,
} from 'express';

const cheerio = require('cheerio');

const router = express.Router();

const axios = require('axios');

router.get('/', (req: Request, res: Response) => {
  axios
    .get(
      // 'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=40%2C34%2C123&startDate=04%2F10%2F2024&endDate=05%2F10%2F2024&sort=date',
      'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=40&startDate=04%2F11%2F2024&endDate=05%2F11%2F2024&sort=title',
    )
    .then((response: { data: [] }) => {
      // console.log(response.data);

      // Use Cheerio to parse the HTML
      const $ = cheerio.load(response.data);
      // cannot send the cheerio variable
      // console.log($('div.results-wrapper')['0'].children);
      // const $results = $('div.results');
      // console.log($results.html());
      const $sharedItems = $('div.shared-items-container');
      // console.log($sharedItems.html());
      // console.log($('div.container'));
      // console.log($('.container')['1']);
      // console.log($('div.data-seo-event'));
      // console.log($('div.shared-items').children());
      // console.log($('li.dates'));
      // console.log($('div.shared-items').find('li.dates'));
      // console.log($('[data-type=event]').html());
      // console.log($('div[data-type="event"]').html());

      res.send($sharedItems.html());
      // res.send($results.html());
    })
    .catch((err: Error) => {
      console.error('failed events scraping', err);
      res.sendStatus(500);
    });
});

export = router;
