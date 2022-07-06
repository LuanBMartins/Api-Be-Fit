import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import DataStudentLoadCompose from '../composer/data-student/data-student-load-composer'
import DataStudentCreateRoute from '../composer/data-student/data-student-create-composer'

module.exports = (router: Router) => {
  router.get('/datastudent/load/:id', ExpressRouterAdapter.adapt(DataStudentLoadCompose.composer()))
  router.post('/datastudent/create', ExpressRouterAdapter.adapt(DataStudentCreateRoute.composer()))
}
