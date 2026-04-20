const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_game", (data) => {
    socket.join(data.room);
  });
});

server.listen(3000, () => {
  console.log("Backend running on port 3000");
});
