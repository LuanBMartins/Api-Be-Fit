import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import GymStudentCreateRouterComposer from '../composer/gym-student/gym-student-create-composer'
import GymStudentLoadCompose from '../composer/gym-student/gym-student-load-composer'
import GymStudentDeleteRouterComposer from '../composer/gym-student/gym-student-delete-composer'

module.exports = (router: Router) => {
  router.post('/gymstudent/create', ExpressRouterAdapter.adapt(GymStudentCreateRouterComposer.composer()))
  router.post('/gymstudent/load', ExpressRouterAdapter.adapt(GymStudentLoadCompose.composer()))
  router.post('/gymstudent/delete', ExpressRouterAdapter.adapt(GymStudentDeleteRouterComposer.composer()))
}
