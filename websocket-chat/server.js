const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
console.log("A user connected:", socket.id);


socket.on("chat message", (data) => {
    io.emit("chat message", data);
});

socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
});


});

server.listen(3000,  "172.23.112.1" ,  () => {
console.log("Server running at http://172.23.112.1:3000");
});
