// const express = require('express')
import * as express from 'express';
// import { Express, Request, Response } from 'express';
import path = require('path');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../dist')));

// original rendering before express.static
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port} \n http://localhost:${port}`);
});
