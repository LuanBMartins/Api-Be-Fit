import DataStudentLoadRoute from '../../../presentation/routes/data-student/load-route'
import DataStudentUseCase from '../../../domain/data-student/data-student-usecase'
import DataStudentRepository from '../../../infra/repositorios/data-student-repository'
import Encrypter from '../../../domain/utils/encrypter'

export default class DataStudentLoadRouterComposer {
  static composer () {
    const dataStudentRepository = new DataStudentRepository()
    const encrypter = new Encrypter()
    const dataStudentUseCase = new DataStudentUseCase(dataStudentRepository, encrypter)
    return new DataStudentLoadRoute(dataStudentUseCase)
  }
}
