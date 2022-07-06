import DataStudentCreateRoute from '../../../presentation/routes/data-student/create-route'
import DataStudentUseCase from '../../../domain/data-student/data-student-usecase'
import DataStudentRepository from '../../../infra/repositorios/data-student-repository'

export default class DataStudentLoadRouterComposer {
  static composer () {
    const dataStudentRepository = new DataStudentRepository()
    const dataStudentUseCase = new DataStudentUseCase(dataStudentRepository)
    return new DataStudentCreateRoute(dataStudentUseCase)
  }
}
