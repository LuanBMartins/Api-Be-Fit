import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('BEFIT', 'postgres', 'admin', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
})

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))

export default sequelize
