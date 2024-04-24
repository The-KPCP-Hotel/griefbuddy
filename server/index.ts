import express, {
  Express, Request, Response, NextFunction,
} from 'express';
import path = require('path');
import passport from 'passport';
import session from 'express-session';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import authRouter from './routes/auth';
import profileRouter from './routes/profile';
import eventsRouter from './routes/events';
import quotesRouter from './routes/quotes';
import mapRouter from './routes/map';
import chatbotRouter from './routes/chatbot';
import mainFeedRouter from './routes/mainFeed';

require('dotenv').config();

const app: Express = express();
const port = 3000;

const server = http.createServer(app);
const io = new SocketIOServer(server);

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

// allow passport to use "express-session".`
app.use(passport.session());

const CLIENT_PATH = path.resolve(__dirname, '../dist');
app.use(express.static(CLIENT_PATH));

app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/events', eventsRouter);
app.use('/quotes', quotesRouter);
app.use('/map', mapRouter);
app.use('/chatbot', chatbotRouter);
app.use('/mainFeed', mainFeedRouter);

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

app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_PATH, 'index.html'));
});

app.get('/user', checkAuth, (req: Request, res: Response) => {
  // console.log('from /user', req.user);
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

io.on('connection', (socket) => {
  console.log(`${socket.id} connected.`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
  });

  socket.on('message', (data) => {
    // access socketID of sender
    io.to(data.room).emit('receive_message', { text: data.text, sender: socket.id });
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected.`);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(CLIENT_PATH, 'index.html'));
});

server.listen(port, () => {
  console.log(
    `Example app listening on port ${port} \n http://localhost:${port}`,
  );
});
