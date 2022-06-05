import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
<<<<<<< HEAD
import GymStudentCreateRouterComposer from '../composer/gym-student/gym-student-create-composer'
import GymStudentLoadCompose from '../composer/gym-student/gym-student-load-composer'
import GymStudentDeleteRouterComposer from '../composer/gym-student/gym-student-delete-composer'
import GymStudentupdateRoute from '../composer/gym-student/gym-student-update-composer'

module.exports = (router: Router) => {
  router.post('/gymstudent/create', ExpressRouterAdapter.adapt(GymStudentCreateRouterComposer.composer()))
  router.post('/gymstudent/load', ExpressRouterAdapter.adapt(GymStudentLoadCompose.composer()))
  router.post('/gymstudent/delete', ExpressRouterAdapter.adapt(GymStudentDeleteRouterComposer.composer()))
  router.post('/gymstudent/update/:id', ExpressRouterAdapter.adapt(GymStudentupdateRoute.composer()))
=======
import GymStudentCreateRouterComposer from '../composer/gym-student/gym-student-composer'

module.exports = (router: Router) => {
  router.post('/gymstudent/create', ExpressRouterAdapter.adapt(GymStudentCreateRouterComposer.composer()))
>>>>>>> 40bf0ddaf424faebf47b12a7462ebcbe58abf71f
}
