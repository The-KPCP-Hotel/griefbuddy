// const express = require('express')
import * as express from 'express';
// import { Express, Request, Response } from 'express';
import path = require('path');
import * as passport from 'passport';
import * as session from 'express-session';
import * as http from 'http';
import { Server } from 'socket.io';

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

const checkAuth = (
  req: { isAuthenticated: Function },
  res: { redirect: Function },
  next: Function,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};

app.get(
  '/',
  checkAuth,
  (req, res) => {
    res.sendFile(path.join(CLIENT_PATH, 'index.html'));
  },
);

app.get('/user', checkAuth, (req, res) => {
  res.send(req.user);
});

app.post('/logout', (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
});

app.get(
  '/*',
  checkAuth,
  (req, res) => {
    res.sendFile(path.join(CLIENT_PATH, 'index.html'));
  },
);

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port} \n http://localhost:${port}`,
  );
});
