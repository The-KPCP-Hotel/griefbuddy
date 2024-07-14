import express from 'express';

const buddy = express.Router();

buddy.post('/new', (req, res) => {
  // should flag current buddy rows to expired
  // find and save all rows not expired
  // change to expired

  // should go through users pairing each with a new buddy - avoiding pairing a user w/ last buddy
  // get all users
  // create paired users array
  // iterate through users - while paired users array's length is less than users length
    // use math random to find user to pair with
    // check buddies originally saved to make sure they weren't paired together last
    // add new buddy row
});

export = buddy;
