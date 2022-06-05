import GymStudentDeleteRoute from '../../../presentation/routes/gym-student/delete-route'
import GymStudentUseCase from '../../../domain/gym-student/gym-student-usecase'
import GymStudentRepository from '../../../infra/repositorios/gym-student-repository'
import Encrypter from '../../../domain/utils/encrypter'

export default class GymStudentDeleteRouterComposer {
  static composer () {
    const gymStudentRepository = new GymStudentRepository()
    const encrypter = new Encrypter()
    const gymStudentUseCase = new GymStudentUseCase(gymStudentRepository, encrypter)
    return new GymStudentDeleteRoute(gymStudentUseCase)
  }
}
