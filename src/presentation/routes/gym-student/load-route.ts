import loadHttpRequest from '../../../interface/gym-student/gym-student-create-httpRequest'
import gymStudentUseCaseInterface from '../../../interface/gym-student/gym-student-usecase'
import response from '../../utils/responseBody'

export default class GymStudentLoadRoute {
  private gymStudentUseCase
  constructor (gymStudentUseCase: gymStudentUseCaseInterface) {
    this.gymStudentUseCase = gymStudentUseCase
  }

  async route (httpRequest: loadHttpRequest) {
    try {
      if (!httpRequest.body.email) {
        return response(400, 'invalid email!')
      }
      const userLoad = await this.gymStudentUseCase.load(httpRequest.body.email)
      if (userLoad) {
        return response(200, userLoad)
      }
      return response(200, 'Usuário não encontrado!')
    } catch (error) {
      return response(error.status, error.message)
    }
  }
}
