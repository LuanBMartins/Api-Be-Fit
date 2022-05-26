import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'

export default (router: Router) => {
  router.post('/login', ExpressRouterAdapter.adapt())
}
