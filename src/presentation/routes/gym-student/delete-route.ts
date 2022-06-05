import DeleteHttpRequest from '../../../interface/gym-student/gym-student-create-httpRequest'
import gymStudentUseCaseInterface from '../../../interface/gym-student/gym-student-usecase'
import response from '../../utils/responseBody'
import Authenticate from '../../utils/Authenticate'

export default class GymStudentDeleteRoute extends Authenticate {
  private gymStudentUseCase
  constructor (gymStudentUseCase: gymStudentUseCaseInterface) {
    super()
    this.gymStudentUseCase = gymStudentUseCase
  }

  async route (httpRequest: DeleteHttpRequest) {
    try {
      if (!httpRequest.headers.authorization) {
        return response(401, 'Unauthorized!')
      }
      const auth = await this.authenticate(httpRequest.headers.authorization)
      if (!auth) return response(401, 'Unauthorized!')

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
