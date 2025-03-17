import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Unathorized - No token provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if (!decoded) {
            return res.status(401).json({ message: "Unathorized - Invalid Token" })
        }

        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(401).json({ message: "user not found" })
        }

        req.user = user
        next()

    } catch (error) {
        console.log("Error in protect route controller ", error.message)
        res.status(500).json({ message: "internal server error" })
    }
}