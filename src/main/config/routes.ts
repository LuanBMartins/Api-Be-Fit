import { Router, Express } from 'express'
import fg from 'fast-glob'

const router = Router()

export default (app: Express): void => {
  app.use('/api', router)
  fg.sync('**/src/main/routes/**routes.ts').forEach((file: string) => require(`../../../${file.replace('.ts', '')}`)(router))
}
