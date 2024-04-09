// const express = require('express')
import * as express from 'express';
// import { Express, Request, Response } from 'express';
import path = require('path');
import * as passport from 'passport';
import * as session from 'express-session';

require('dotenv').config();

const app = express();
const port = 3000;
const authRouter = require('./routes/auth');

app.use(express.json());

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);

// init passport on every route call.
app.use(passport.initialize());

// allow passport to use "express-session".
app.use(passport.session());

const CLIENT_PATH = path.resolve(__dirname, '../dist');
app.use(express.static(CLIENT_PATH));

app.use('/auth', authRouter);

app.get(
  '/',
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/');
  },
  (req, res) => {
    // res.render('dashboard.ejs', { name: req.user.displayName });
    res.sendFile(path.join(CLIENT_PATH, 'index.html'));
  },
);

app.get('/*', (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}, (req, res) => {
  res.sendFile(path.join(CLIENT_PATH, 'index.html'));
});

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port} \n http://localhost:${port}`,
  );
});
