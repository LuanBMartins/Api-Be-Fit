import GymStudentEmailConfirmationRoute from '../../../presentation/routes/gym-student/email-confirmation'
import GymStudentUseCase from '../../../domain/gym-student/gym-student-usecase'
import GymStudentRepository from '../../../infra/repositorios/gym-student-repository'
import Encrypter from '../../../domain/utils/encrypter'

export default class GymStudentCreateRouterComposer {
  static composer () {
    const gymStudentRepository = new GymStudentRepository()
    const encrypter = new Encrypter()
    const gymStudentUseCase = new GymStudentUseCase(gymStudentRepository, encrypter)
    return new GymStudentEmailConfirmationRoute(gymStudentUseCase)
  }
}
