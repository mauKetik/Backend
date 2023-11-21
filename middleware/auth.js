const { comparePassword } = require("../helpers/bcrypt");
const { verifyToken } = require("../helpers/jwt");
const {User} = require("../models")

const authentication = async(req,res,next) =>{
    try {
        const {authorization} = req.headers

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
    // console.log(rowToken);
    const token = rowToken[1]
    // console.log(token, 'token');
    const playload = verifyToken(token)
    // console.log(playload, "<<<");
    
    const data = await User.findByPk(playload.id)
    
    req.user = data
    next()
    } catch (error) {
        console.log(error);
        // nextError()
    }
}


module.exports = {authentication}