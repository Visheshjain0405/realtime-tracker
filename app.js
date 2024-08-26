const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection",function(socket){
    console.log("connected")
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data})
    })
})
app.get("/", function (req, res) {
    res.render("index");
})

server.listen(3000)

