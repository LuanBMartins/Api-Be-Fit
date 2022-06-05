import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import GymStudentCreateRouterComposer from '../composer/gym-student/gym-student-composer'

module.exports = (router: Router) => {
  router.post('/gymstudent/create', ExpressRouterAdapter.adapt(GymStudentCreateRouterComposer.composer()))
}
