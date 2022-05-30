import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
  host: process.env.DB_HOST,
  port: parseFloat(process.env.DB_PORT || '') || 0,
  dialect: 'postgres'
})

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))

export default sequelize
