import Express from 'express'
import cors from 'cors'
import setupRoutes from './routes'

const app = Express()

app.use(Express.json())
app.use(cors())
setupRoutes(app)

export default app
