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
      console.log($('.container'));
      res.send('did it');
    })
    .catch();
});

export = router;
