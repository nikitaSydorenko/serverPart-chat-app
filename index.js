const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

const server = app.listen("3001", () => {
    console.log("Server Running on Port 3001...");
});

io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("User Joined Room: " + data);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data.content);
    });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
    });
});

