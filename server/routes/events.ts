import express, {
  Request, Response,
} from 'express';

import axios, {
  AxiosResponse,
} from 'axios';

import cheerio from 'cheerio';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  axios
    .get(
      // 'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=40%2C34%2C123&startDate=04%2F10%2F2024&endDate=05%2F10%2F2024&sort=date',
      'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=40&startDate=04%2F11%2F2024&endDate=05%2F11%2F2024&sort=title',
    )
    .then((response: AxiosResponse) => {
      // console.log(response.data);

      // Use Cheerio to parse the HTML
      const $ = cheerio.load(response.data);

      // console.log($('div.results-wrapper')['0'].children); // this is not near nested enough

      // const $results = $('div.results'); // this div is less nested than $sharedItems
      // console.log($results.html());

      const $sharedItems = $('div.shared-items-container');
      // console.log($sharedItems.html()); // div.shared-item => div.container => empty

      // console.log($('div.container'));
      // console.log($('div.container').html()); // empty line

      // console.log($('.container')['1']);
      // console.log($('.container').html()); // empty line

      // console.log($('div.data-seo-event'));
      // console.log($('div.data-seo-event').html()); // null

      // console.log($('div.shared-items').find('li.dates').html()); // null

      // <h3>Map Results</h3><div class="map-counter" data-sv-map-items-counter=""></div>
      // console.log($('div.shared-items').children().html());

      // console.log($('li.dates').html()); // null

      // console.log($('[data-type=event]').html()); // null
      // console.log($('div[data-type="event"]').html()); // null

      // res.send($sharedItems.html());
      res.send($.html()); // the divs with info seem to be loaded in from a script and unavailable
    })
    .catch((err: Error) => {
      console.error('failed events scraping', err);
      res.sendStatus(500);
    });
});

export = router;
