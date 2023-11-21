const express = require('express')
const authRouter = express.Router()

const ControllerLogin = require('../Controllers/controllerLogin')


//user
authRouter.post("/login", ControllerLogin.login)
//pub
authRouter.post("/register", ControllerLogin.register)

module.exports = authRouter;