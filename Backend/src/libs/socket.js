import { Server } from 'socket.io'
import http from "http"
import express from "express"


const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

// used to store onlineUsers

const userSocketmap = {}; // {UserId: socketId}


io.on('connection', (socket) => {
    console.log("User Connected", socket.id)
    const userId = socket.handshake.query.userId
    if (userId) userSocketmap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketmap))

    socket.on('disconnect', () => {
        console.log("user disconnected", socket.id)
    })
})

export { app, server, io }