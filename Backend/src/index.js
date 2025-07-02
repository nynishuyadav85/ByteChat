import express from 'express'
import dotenv from 'dotenv'
import authRoutes from '../src/routes/auth.route.js'
import messageRoutes from '../src/routes/message.route.js'
import { connectDB } from './libs/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './libs/socket.js';

import path from "path";

dotenv.config();
app.use(express.json())
app.use(cookieParser())

// Allow multiple origins for deployment
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://your-frontend-domain.vercel.app", // Replace with your actual Vercel domain
    // Add your production frontend URL here
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}))

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log("Server running on port " + PORT)
    connectDB();
})