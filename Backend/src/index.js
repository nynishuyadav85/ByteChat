import express from 'express'
import dotenv from 'dotenv'
import authRoutes from '../src/routes/auth.route.js'
import messageRoutes from '../src/routes/message.route.js'
import { connectBD } from './libs/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './libs/socket.js';


dotenv.config();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const PORT = process.env.PORT;


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


server.listen(PORT, () => {
    console.log("Server " + PORT)
    connectBD();
})