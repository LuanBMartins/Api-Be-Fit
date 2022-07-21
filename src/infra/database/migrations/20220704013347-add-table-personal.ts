'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('personal', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new Sequelize.STRING(128),
        allowNull: false
      },
      email: {
        type: Sequelize.CHAR(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: true
      }

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('personal')
  }
}
