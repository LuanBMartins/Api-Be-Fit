'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('video', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new Sequelize.STRING(128),
        allowNull: false
      },
      category: {
        type: Sequelize.CHAR(100),
        allowNull: false
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      PersonalId: {
        type: Sequelize.INTEGER,
        references: { model: 'personal', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('video')
  }
}
