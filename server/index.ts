import express, {
  Express, Request, Response, NextFunction,
} from 'express';
import path = require('path');
import passport from 'passport';
import session from 'express-session';

require('dotenv').config();

const app: Express = express();
const port = 3000;

const authRouter = require('./routes/auth');
const eventsRouter = require('./routes/events');

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
app.use('/events', eventsRouter);

const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
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
