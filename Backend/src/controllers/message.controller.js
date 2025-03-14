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