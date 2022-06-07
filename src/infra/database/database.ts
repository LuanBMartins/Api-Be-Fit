import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.PGDATABASE || '', process.env.PGUSER || '', process.env.PGPASSWORD || '', {
  host: process.env.PGHOST,
  port: parseFloat(process.env.PGPORT || '') || 0,
  dialect: 'postgres'
})

sequelize.authenticate()
  .then(async () => console.log('Connection has been established successfully.'))

export default sequelize
