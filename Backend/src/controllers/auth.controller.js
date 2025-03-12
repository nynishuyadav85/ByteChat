import { generateToken } from '../libs/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    const { email, password, fullName } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password < 6) {
            return res.status(400).json({ message: "passwor must be atlest 6 character" })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }

        const salt = await bcrypt.genSalt(10)
        const hassedpassword = await bcrypt.hash(password, salt)

        const newUser = await new User({
            email,
            fullName,
            password: hassedpassword
        })
        if (newUser) {
            // generate jwt token
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ message: "Invalid User data" })
        }
    } catch (error) {
        console.log("Error in controller ", error.message)
        res.status(500).json({ message: "internal server error" })

    }
}

export const login = (req, res) => {
    res.send("login api")
}

export const logout = (req, res) => {
    res.send("logout api")
}