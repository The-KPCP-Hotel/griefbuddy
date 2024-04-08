// const express = require('express')
import * as express from 'express';
// import { Express, Request, Response } from 'express';
import path = require('path');
import * as passport from 'passport';
import * as session from 'express-session';

const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const app = express();
const port = 3000;

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

app.use(express.static(path.resolve(__dirname, '../dist')));

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/google/callback',
      passReqToCallback: true,
    },
    // The "authUser" is a function that we will define later will contain
    // the steps to authenticate a user, and will return the "authenticated user".
    (
      request: Request,
      accessToken: String,
      refreshToken: String,
      profile: Object,
      done: Function,
    ) => done(null, profile),
  ),
);

// The "user" is the authenticated user object,
// that is passed from the authUser() function in "Google Strategy".
// This "user" object is attached to "req.session.passport.user.{user}"
passport.serializeUser((user, done) => {
  done(null, user);
});

// The "user" is the authenticated user object,
// that was attached to "req.session.passport.user.{user}" in the passport.serializeUser() function.
passport.deserializeUser((user, done) => {
  done(null, user);
});

// original rendering before express.static
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port} \n http://localhost:${port}`,
  );
});
