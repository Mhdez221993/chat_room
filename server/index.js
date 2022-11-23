const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const PORT = 3001;

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`connected clien with ID: ${socket.id}`);

  socket.on('join_room', (data) => {
    console.log(`user with ID: ${socket.id} joined room: ${data}`);
  })

  socket.on('disconnect', () => {
    console.log(`disconnected clien with ID: ${socket.id}`);
  })
})

server.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
