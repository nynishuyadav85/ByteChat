import express from 'express'
import dotenv from 'dotenv'
import authRoutes from '../src/routes/auth.route.js'
import { connectBD } from './libs/db.js';

dotenv.config();
const app = express()

const PORT = process.env.PORT;


app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log("Server " + PORT)
    connectBD();
})