'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.User, {as : "player1", foreignKey : "userId1"})
      Room.belongsTo(models.User, {as : "player2", foreignKey : "userId2"})
    }
  }
  Room.init({
    userId1: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "userId1 is not null"
        },
        notEmpty : {
          args : true,
          msg : "userId1 is not empty"
        }
      }
    },
    userId2: {
      type :  DataTypes.INTEGER
    },
    roomId: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "roomId is not null"
        },
        notEmpty : {
          args : true,
          msg : "roomId is not empty"
        }
      }
    },
    status: {
      type : DataTypes.STRING,
      defaultValue : "waiting"
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};