import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import WorkoutCreateRouterComposer from '../composer/workout/workout-create-composer'
import WorkoutDeleteRouterComposer from '../composer/workout/workout-delete-composer'
import WorkoutListAllRouterComposer from '../composer/workout/workout-list-composer'

module.exports = (router: Router) => {
  router.post('/workout/create/', ExpressRouterAdapter.adapt(WorkoutCreateRouterComposer.composer()))
  router.delete('/workout/delete/:id', ExpressRouterAdapter.adapt(WorkoutDeleteRouterComposer.composer()))
  router.get('/workout/list/:id', ExpressRouterAdapter.adapt(WorkoutListAllRouterComposer.composer()))
}
