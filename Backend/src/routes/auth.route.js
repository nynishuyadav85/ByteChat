import express from 'express'

const router = express.Router()


router.get('/signup', (req, res) => {
    res.send("signup api")
})

router.get('/login', (req, res) => {
    res.send("login api")
})

router.get('/logout', (req, res) => {
    res.send("logout api")
})


export default router