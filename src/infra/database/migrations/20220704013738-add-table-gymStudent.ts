'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('gymStudent', {
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
        allowNull: true
      },
      confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      goals: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      PersonalId: {
        type: Sequelize.INTEGER,
        references: { model: 'personal', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('gymStudent')
  }
}
