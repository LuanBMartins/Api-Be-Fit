'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('exercise', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      workoutId: {
        type: Sequelize.INTEGER,
        references: { model: 'workout', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      exerciseName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      serie: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      repetition: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('exercise')
  }
}
