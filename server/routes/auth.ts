import passport = require('passport');

const express = require('express');

const router = express.Router();

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
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

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login',
  }),
);

module.exports = router;
