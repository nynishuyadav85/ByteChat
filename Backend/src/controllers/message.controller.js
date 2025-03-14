import cloudinary from "../libs/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";


export const getUsersForSideBar = async (req, res) => {
    try {
        const loogedInUser = req.user._id;
        const fillteredUsers = await User.find({ _id: { $ne: loogedInUser } }).select("-password")

        res.status(200).json(fillteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSideBar controller ", error.message)
        res.status(500).json({ message: "internal server error" })
    }

}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller ", error.message)
        res.status(500).json({ message: "internal server error" })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: recieverId } = req.params
        const senderId = req.user._id

        let imageUrl;
        if (image) {
            //upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url

            const newMessage = new Message({
                senderId,
                recieverId,
                text,
                image: imageUrl
            })
            await newMessage.save()
            res.status(201).json(newMessage)
        }
    } catch (error) {
        console.log("Error in sendMessage controller ", error.message)
        res.status(500).json({ message: "internal server error" })
    }
}