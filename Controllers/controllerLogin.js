const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const {User} = require("../models/")

class ControllerLogin {
    static async register(req,res,next){
        try {
            const {username,email, password} = req.body
            const hashedPassword = hashPassword(password)
            const data = await User.create({username,email, password : hashedPassword})
            res.status(201).json({id : data.id, email : data.email})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req,res,next){
        try {
            let data = await User.findOne({
                where : {
                    email : req.body.email
                }
            })
            if(!data){
                throw {name : "invalidEmail/Password"}
            }
            const isValid = comparePassword(req.body.password, data.password)
            if(isValid === true){
                const token = createToken({
                    id : data.id,
                })
                res.status(200).json({access_token : token, email : data.email})
            } else {
                throw {name : "invalidEmail/Password"}
            }
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerLogin