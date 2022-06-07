import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import PersonalRouterComposer from '../composer/personal/personal-composer'

module.exports = (router: Router) => {
  router.put('/personal/update/:id', ExpressRouterAdapter.adapt(PersonalRouterComposer.composer()))
  router.get('/personal/load/:email', ExpressRouterAdapter.adapt(PersonalRouterComposer.composer()))
}
