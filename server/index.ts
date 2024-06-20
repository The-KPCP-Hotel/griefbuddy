import express, { Express, Request, Response, NextFunction } from 'express';
import path = require('path');
import passport from 'passport';
import session from 'express-session';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import authRouter from './routes/auth';
import profileRouter from './routes/profile';
import eventsRouter from './routes/events';
import quotesRouter from './routes/quotes';
import mapRouter from './routes/map';
import chatbotRouter from './routes/chatbot';
import mainFeedRouter from './routes/mainFeed';
import resourcesRouter from './routes/resources';
import chatRouter from './routes/chat';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const { Message } = prisma;

require('dotenv').config();

const app: Express = express();
const port = 3000;

const server = createServer(app);
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

// const CLIENT_PATH = path.resolve(__dirname, '../dist');
const CLIENT_PATH =
  process.env.MODE === 'development'
    ? path.resolve(__dirname, '../dist')
    : path.resolve(__dirname, '../');
app.use(express.static(CLIENT_PATH));

app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/events', eventsRouter);
app.use('/quotes', quotesRouter);
app.use('/map', mapRouter);
app.use('/chatbot', chatbotRouter);
app.use('/mainFeed', mainFeedRouter);
app.use('/resources', resourcesRouter);
app.use('/chat', chatRouter);

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
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
  // console.log(`${socket.id} connected to chat.`);
  socket.on('msg', (msg: string, clientOffset) => {
    io.emit('sendMsg', msg, clientOffset);
  });

  socket.on('room', (room) => {
    // console.log('joining room: ', room);
    socket.join(room);
  });

  socket.on('dm', async (dm: string, room: string, userId: number, sendId: number) => {
    // console.log('sending to room: ', room);
    const message = await Message.create({
      data: { msg: dm, senderId: userId, recipientId: sendId },
    });
    io.to(room).emit('sendDm', message.msg, message.senderId, message.recipientId);
    // console.log(message);
  });
});
// io.on('connection', (socket) => {
//   console.log(`${socket.id} connected.`);

//   socket.on('join_room', (room) => {
//     socket.join(room);
//     console.log(`${socket.id} joined room ${room}`);
//   });

//   socket.on('message', (data) => {
//     // access socketID of sender
//     io.to(data.room).emit('receive_message', { text: data.text, sender: socket.id });
//   });

//   socket.on('disconnect', () => {
//     console.log(`${socket.id} disconnected.`);
//   });
// });

app.get('/*', checkAuth, (req, res) => {
  res.sendFile(path.join(CLIENT_PATH, 'index.html'));
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port} \n http://localhost:${port}`);
});
