import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import PersonalUpdateRouterComposer from '../composer/personal/personal-update-composer'
import PersonalLoadRouterComposer from '../composer/personal/personal-load-composer'
import PersonalListRouterComposer from '../composer/personal/personal-list-composer'

module.exports = (router: Router) => {
  router.put('/personal/update/:id', ExpressRouterAdapter.adapt(PersonalUpdateRouterComposer.composer()))
  router.get('/personal/load/:email', ExpressRouterAdapter.adapt(PersonalLoadRouterComposer.composer()))
  router.get('/personal/list/:id', ExpressRouterAdapter.adapt(PersonalListRouterComposer.composer()))
}
