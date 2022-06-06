import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import PersonalRouterComposer from '../composer/personal/personal-composer'

module.exports = (router: Router) => {
  router.put('/personal/:id', ExpressRouterAdapter.adapt(PersonalRouterComposer.composer()))
}
