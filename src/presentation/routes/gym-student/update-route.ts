import UpdateHttpRequest from '../../../interface/gym-student/gym-student-create-httpRequest'
import gymStudentUseCaseInterface from '../../../interface/gym-student/gym-student-usecase'
import response from '../../utils/responseBody'

export default class GymStudentUpdateRoute {
  private gymStudentUseCase
  constructor (gymStudentUseCase: gymStudentUseCaseInterface) {
    this.gymStudentUseCase = gymStudentUseCase
  }

  async route (httpRequest: UpdateHttpRequest) {
    try {
      if (!httpRequest.params.id) {
        return response(400, 'invalid id!')
      }
      if (!httpRequest.body) {
        return response(400, 'invalid body!')
      }
      const userupdate = await this.gymStudentUseCase.update(httpRequest.params.id, httpRequest.body)
      console.log('testeee', userupdate)

      if (userupdate[0] !== 0) {
        return response(200, 'Dados atualizado!')
      }
      return response(200, 'Usuário não encontrado!')
    } catch (error) {
      return response(error.status, error.message)
    }
  }
}
