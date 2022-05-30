import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import LoginRouterComposer from '../composer/login-composer'

module.exports = (router: Router) => {
  router.post('/login', ExpressRouterAdapter.adapt(LoginRouterComposer.composer()))
}
