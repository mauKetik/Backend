const jwt = require("jsonwebtoken")
require("dotenv").config()

function createToken(input){
    return jwt.sign(input, process.env.SECRET)
}

function compareToken(token){
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {createToken, compareToken}