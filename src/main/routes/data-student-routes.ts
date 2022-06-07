import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import DataStudentLoadCompose from '../composer/data-student/data-student-load-composer'
import DataStudentUpdateRoute from '../composer/data-student/data-student-update-composer'

module.exports = (router: Router) => {
  router.get('/datastudent/load/:id', ExpressRouterAdapter.adapt(DataStudentLoadCompose.composer()))
  router.put('/datastudent/update/:id', ExpressRouterAdapter.adapt(DataStudentUpdateRoute.composer()))
}
