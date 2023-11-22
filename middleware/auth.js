const { comparePassword } = require("../helpers/bcrypt");
const { verifyToken } = require("../helpers/jwt");
const {User} = require("../models")

const authentication = async(req,res,next) =>{
    try {
        const { authorization } = req.headers;
        // console.log(authorization);
        if (!authorization) {
            throw { name: "EmptyToken" };
        }

        const rawToken = authorization.split(" ");
        if (rawToken[0] !== "Bearer" || rawToken.length < 2) {
            throw { name: "EmptyToken" };
        }

        const token = rawToken[1];
        const payload = verifyToken(token);

        const user = await User.findByPk(payload.id);
        if (!user) {
            throw { name : "NotFound" };
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        // nextError()
    }
}


module.exports = {authentication}