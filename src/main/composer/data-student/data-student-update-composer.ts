import DataStudentUpdateRoute from '../../../presentation/routes/data-student/update-route'
import DataStudentUseCase from '../../../domain/data-student/data-student-usecase'
import DataStudentRepository from '../../../infra/repositorios/data-student-repository'

export default class DataStudentLoadRouterComposer {
  static composer () {
    const dataStudentRepository = new DataStudentRepository()
    const dataStudentUseCase = new DataStudentUseCase(dataStudentRepository)
    return new DataStudentUpdateRoute(dataStudentUseCase)
  }
}
