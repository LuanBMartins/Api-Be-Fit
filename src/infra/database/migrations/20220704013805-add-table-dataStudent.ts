'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('dataStudent', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      weight: {
        type: Sequelize.FLOAT(),
        defaultValue: 0,
        allowNull: false
      },
      height: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false
      },
      arms: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false
      },
      legs: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false
      },
      waist: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false
      },
      chest: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false
      },
      gymStudentId: {
        type: Sequelize.INTEGER,
        references: { model: 'gymStudent', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('dataStudent')
  }
}
