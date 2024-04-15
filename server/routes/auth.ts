import passport = require('passport');

const express = require('express');

const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const host = (process.env.MODE === 'development') ? 'localhost' : '13.56.76.68';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://${host}:3000/auth/google/callback`,
      passReqToCallback: true,
    },
    (
      request: Request,
      accessToken: String,
      refreshToken: String,
      // profile: Object,
      profile: { id: string; displayName: string },
      done: Function,
    ) => {
      const { id, displayName } = profile;
      prisma.User.upsert({
        where: {
          googleId: id,
        },
        update: {},
        create: {
          googleId: id,
          name: displayName,
        },
      })
        .then((user: object) => done(null, user))
        .catch((err: Error) => {
          console.error('failed finding or creating user', err);
          return done(err, null);
        });
    },
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

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/',
  }),
);

module.exports = router;
