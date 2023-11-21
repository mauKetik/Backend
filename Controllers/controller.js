const {Room, User} = require("../models")


class Controller{
    static async createRoom(req,res,next){
        try {
            const lastRandom = Date.now()
            console.log(req.user.id);
            let data = await Room.create({
                userId1 : req.user.id,
                roomId : 'R-' + lastRandom,
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async joinRoom(req,res,next){
        try {
            const {roomId} = req.params
            let data = await Room.update({
                userId2 : req.user.id,
            }, {
                where : {
                    roomId : roomId
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async myProfile(req,res,next){
        try {
            const data = await User.findByPk(req.user.id, {
                attributes : {exclude : ['password']}
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getAllRoom(req,res,next){
        try {
            const data = await Room.findAll({
                include : [{
                    as : "player1",
                    model : User,
                    attributes : {exclude : ["email", "password"]}
                }]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async leaderboard(req,res,next){
        try {
            const data = await User.findAll({
                order : [
                    ['win', "DESC"],
                ], limit : 10,
                attributes : {exclude : ['password','email']}
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async destroyRoom(req,res,next){
        try {
            const {roomId} = req.params
            await Room.destroy({
                where : {
                    roomId :  roomId
                }
            })
            res.status(200).json({ message : `Room with id ${roomId} success to delete`})
        } catch (error) {
            next(error)
        }
    }
    static async waitingRoom(req,res,next){
        try {
            const {roomId} = req.params
            const data = await Room.findOne({
                where : {roomId}, 
                include : [{
                as : "player1",
                model : User,
                attributes : {exclude : ["email", "password"]}
            },
            {
                as: "player2",
                model: User,
                attributes: { exclude: ["email", "password"] }
            }
        ]})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller