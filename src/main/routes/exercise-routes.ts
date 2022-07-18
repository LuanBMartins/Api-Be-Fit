import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import ExerciseCreateComposer from '../composer/exercise/exercise-create-composer'
import ExerciseDeleteRouterComposer from '../composer/exercise/exercise-delete-composer'
import ExerciseListAllRouterComposer from '../composer/exercise/exercise-list-composer'

module.exports = (router: Router) => {
  router.post('/exercise/create', ExpressRouterAdapter.adapt(ExerciseCreateComposer.composer()))
  router.delete('/exercise/delete/:id', ExpressRouterAdapter.adapt(ExerciseDeleteRouterComposer.composer()))
  router.get('/exercise/list/:id', ExpressRouterAdapter.adapt(ExerciseListAllRouterComposer.composer()))
}
