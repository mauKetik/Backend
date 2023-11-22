'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      password: {
        type: Sequelize.STRING
      },
      win: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      totalGame: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};