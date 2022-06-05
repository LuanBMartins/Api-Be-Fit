import DeleteHttpRequest from '../../../interface/gym-student/gym-student-create-httpRequest'
import gymStudentUseCaseInterface from '../../../interface/gym-student/gym-student-usecase'
import response from '../../utils/responseBody'

export default class GymStudentDeleteRoute {
  private gymStudentUseCase
  constructor (gymStudentUseCase: gymStudentUseCaseInterface) {
    this.gymStudentUseCase = gymStudentUseCase
  }

  async route (httpRequest: DeleteHttpRequest) {
    try {
      if (!httpRequest.body.id) {
        return response(400, 'invalid id!')
      }
      const userDelete = await this.gymStudentUseCase.delete(httpRequest.body.id)
      if (userDelete) {
        return response(200, 'Usuário Removido!')
      }
      return response(200, 'Usuário não encontrado!')
    } catch (error) {
      return response(error.status, error.message)
    }
  }
}
