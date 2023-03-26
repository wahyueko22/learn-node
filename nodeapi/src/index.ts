'use strict';
import { config } from 'dotenv';
config();

import express, { Request, Response } from "express";

import routes from './router/router';



const app = express()

const port = process.env.PORT || 8080;

console.log(`poooooooooooot${port}`)

app.use(express.json())

app.use(routes);

// TODO: Routing aplikasi akan kita tulis di sini
app.get('/feed', async (req: Request, res: Response) => {

    res.json({key:"value"})
  })



const server = app.listen(port, () =>{
   console.log(`[server]: Server is running at https://localhost:${port}`)
})

const io = require('socket.io')(server, {
  cors: {
      origin: '*',
      methods: ["GET", "POST"],
      credentials: true
  },
  origins: '*:*',
  transports: ['websocket', 'polling'],
  handlePreflightRequest: (req: any, res: any) => {
      const headers = {
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Origin": ['*'],
          "Access-Control-Allow-Credentials": true
      };
      res.writeHead(200, headers);
      res.end();
  }
});
io.on('connection', (socket: any) => {
  console.log('a user connected : ' + socket.id);

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });

  socket.on('chat message', (notification: any) => {
      console.log('chat message', notification);
      socket.emit("chat message " + socket.id, notification);
  });

  socket.on('broadcast-message', (notification: any) => {
    console.log('broadcast-message', notification);
    io.emit("broadcast-message ", notification);
});
});

