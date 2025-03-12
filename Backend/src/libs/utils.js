import jwt from 'jsonwebtoken'


export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_KEY, {
        expiresIn: "7d"
    })

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //prevent XSS attack cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request foriery attack
        secure: process.env.NODE_ENV != "development"
    })

}