'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('workout', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      category: {
        type: Sequelize.CHAR(100),
        allowNull: false
      },
      day: {
        type: Sequelize.CHAR(20),
        allowNull: false
      },
      PersonalId: {
        type: Sequelize.INTEGER,
        references: { model: 'personal', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('workout')
  }
}
