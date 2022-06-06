import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import DataStudentCreateRouterComposer from '../composer/data-student/data-student-create-composer'
import DataStudentLoadCompose from '../composer/data-student/data-student-load-composer'
import DataStudentUpdateRoute from '../composer/data-student/data-student-update-composer'

module.exports = (router: Router) => {
  router.post('/datastudent/create', ExpressRouterAdapter.adapt(DataStudentCreateRouterComposer.composer()))
  router.post('/datastudent/load', ExpressRouterAdapter.adapt(DataStudentLoadCompose.composer()))
  router.post('/datastudent/update/:id', ExpressRouterAdapter.adapt(DataStudentUpdateRoute.composer()))
}
