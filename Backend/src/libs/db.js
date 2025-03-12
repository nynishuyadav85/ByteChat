import mongoose from "mongoose"

export const connectBD = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DB connected ${conn.connection.host}`)
    } catch (error) {
        console.log(`DB error ${conn.connection.host}`)
    }

}