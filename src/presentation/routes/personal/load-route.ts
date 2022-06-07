import loadHttpRequest from '../../../interface/gym-student/gym-student-create-httpRequest'
import personalUseCaseInterface from '../../../interface/personal-usecase'
import response from '../../utils/responseBody'
import Authenticate from '../../utils/Authenticate'

export default class PersonalLoadRoute extends Authenticate {
  private personalUseCase
  constructor (personalUseCase: personalUseCaseInterface) {
    super()
    this.personalUseCase = personalUseCase
  }

  async route (httpRequest: loadHttpRequest) {
    try {
      if (!httpRequest.headers.authorization) {
        return response(401, 'Unauthorized!')
      }
      const auth = await this.authenticate(httpRequest.headers.authorization)
      if (!auth) return response(401, 'Unauthorized!')

      if (!httpRequest.body.email) {
        return response(400, 'invalid email!')
      }
      const userLoad = await this.personalUseCase.load(httpRequest.body.email)
      if (userLoad) {
        return response(200, userLoad)
      }
      return response(400, 'User not found!')
    } catch (error) {
      return response(error.status, error.message)
    }
  }
}
