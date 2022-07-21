import CreateHttpRequest from '../../../interface/gym-student/gym-student-create-httpRequest'
import gymStudentUseCaseInterface from '../../../interface/gym-student/gym-student-usecase'
import response from '../../utils/responseBody'

import Authenticate from '../../utils/Authenticate'
import schema from './validator-routes/create-route-validator'

export default class GymStudentCreateRoute extends Authenticate {
  private gymStudentUseCase
  constructor (gymStudentUseCase: gymStudentUseCaseInterface) {
    super()
    this.gymStudentUseCase = gymStudentUseCase
  }

  async route (httpRequest: CreateHttpRequest) {
    try {
      if (!httpRequest.headers.authorization) {
        return response(401, 'Unauthorized!')
      }

      const auth = await this.authenticate(httpRequest.headers.authorization, 'P')
      if (!auth) return response(401, 'Unauthorized!')

      if (!httpRequest.body) {
        return response(400, 'invalid body!')
      }

      const { error } = schema.validate(httpRequest.body)

      if (error) return response(400, error.details[0].message)
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
