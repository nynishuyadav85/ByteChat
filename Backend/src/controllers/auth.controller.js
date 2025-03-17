import cloudinary from '../libs/cloudinary.js';
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
        console.log("Error in signup controller ", error.message)
        res.status(500).json({ message: "internal server error" })

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Inavalid credsss." })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Inavalid credsss." })
        }

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller ", error.message)
        res.status(500).json({ message: "internal server error" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully." })
    } catch (error) {
        console.log("Error in logout controller ", error.message)
        res.status(500).json({ message: "Logout internal server error" })
    }


}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body
        const userId = req.user._id
        if (!profilePic) {
            return res.status(400).json({ message: "Provide profile pic" })
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })
        res.status(200).json(updatedUser)


    } catch (error) {
        console.log("Error in update profile ", error.message)
        res.status(500).json({ message: " internal server error" })
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkauth controller ", error.message)
        res.status(500).json({ message: "internal server error" })
    }
}