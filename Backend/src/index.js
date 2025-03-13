import express from 'express'
import dotenv from 'dotenv'
import authRoutes from '../src/routes/auth.route.js'
import { connectBD } from './libs/db.js';
import cookieParser from 'cookie-parser'

dotenv.config();
const app = express()
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT;


app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log("Server " + PORT)
    connectBD();
})