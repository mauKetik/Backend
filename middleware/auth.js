const { comparePassword } = require("../helpers/bcrypt");
const { compareToken } = require("../helpers/jwt");
const {User} = require("../models")

const authentication = async(req,res,next) =>{
    try {
        const {authorization} = req.headers
        console.log(req.headers);
    if (!authorization){
        throw {name : "EmptyToken"}
    }

    const rowToken = authorization.split(" ")
    if(rowToken[0] !== "Bearer"){
        throw {name : "EmptyToken"}
    }
    if(rowToken.length < 2){
        throw {name : "EmptyToken"}
    }

    const token = rowToken[1]
    console.log(token);
    const playload = compareToken(token)
    console.log(playload, "<<<");
    const data = await User.findByPk(playload.id)
    req.user = data

    next()
    } catch (error) {
        console.log(error);
        // nextError()
    }
}


module.exports = {authentication}