const {Room} = require("../models")


class Controller{
    static async createRoom(req,res,next){
        try {
            const lastRandom = new Date.now()
            
            let data = await Room.create({
                userId1 : req.user.id,
                roomId : 'R-' + lastRandom,
            })
            res.status(201).json(data)
        } catch (error) {
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
}

module.exports = Controller