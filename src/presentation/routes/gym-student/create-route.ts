import CreateHttpRequest from '../../../interface/gym-student/gym-student-create-httpRequest'
import gymStudentUseCaseInterface from '../../../interface/gym-student/gym-student-usecase'
import response from '../../utils/responseBody'

export default class GymStudentCreateRoute {
  private gymStudentUseCase
  constructor (gymStudentUseCase: gymStudentUseCaseInterface) {
    this.gymStudentUseCase = gymStudentUseCase
  }

  async route (httpRequest: CreateHttpRequest) {
    try {
      if (!httpRequest.body) {
        return response(400, 'invalid body!')
      }
      const userCreate = await this.gymStudentUseCase.create(httpRequest.body)
      if (userCreate) {
        return response(200, 'usuário criado com successo!')
      }
      return response(500, 'Server Error!')
    } catch (error) {
      return response(error.status, error.message)
    }
  }
}
