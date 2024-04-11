const cheerio = require('cheerio');
// const { fromURL } = require('cheerio');

// const { fromURL } = require('cheerio');
const express = require('express');

const router = express.Router();

const axios = require('axios');

router.get('/', () => {
  axios
    .get(
      'https://www.neworleans.com/events/upcoming-events/?skip=0&categoryid=40%2C34%2C123&startDate=04%2F10%2F2024&endDate=05%2F10%2F2024&sort=date',
    )
    .then((response: { data: [] }) => {
      // console.log(response.data);

      // Use Cheerio to parse the HTML
      const $ = cheerio.load(response.data);
      console.log($('.item'));
    })
    .catch();
});

module.exports = router;
