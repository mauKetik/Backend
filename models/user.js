'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Room ,{ as : "player1", foreignKey : "userId1"})
      User.hasMany(models.Room ,{ as : "player2", foreignKey : "userId2"})
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        args : true,
        msg : "username already exist"
      },
      validate : {
        notNull : {
          args : true,
          msg : "username is not null"
        },
        notEmpty : {
          args : true,
          msg : "username is not empty"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique  : {
        args : true,
        msg : "email is exist"
      },
      validate : {
        notNull :{
          args : true,
          msg : "email is not null"
        },
        notEmpty :{
          args : true,
          msg : "email is not empty"
        },
        isEmail : {
          args : true,
          msg : "format email is invalid"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : "password is not null"
        },
        notEmpty : {
          args : true,
          msg : "password is not empty"
        }
      }
    },
    win:{
      type : DataTypes.INTEGER,
      defaultValue : 0
    },
    totalGame: {
      type : DataTypes.INTEGER,
      defaultValue : 0
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};