const express = require('express')
const router = express.Router()
const Controller = require('../Controllers/controller')


router.post("/create-room", Controller.createRoom)
router.patch("/join-room/:roomId", Controller.joinRoom)
// router.delete("/room/:id", Controller.destroyRoom)
router.get("/my-profile", Controller.myProfile)
router.get("/rooms", Controller.getAllRoom)
router.get("/leaderboard", Controller.leaderboard)

module.exports = router;