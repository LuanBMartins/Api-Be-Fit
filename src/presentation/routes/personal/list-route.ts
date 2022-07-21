import listHttpRequest from '../../../interface/personal/personal-create-httpRequest'
import personalUseCaseInterface from '../../../interface/personal-usecase'
import response from '../../utils/responseBody'
import Authenticate from '../../utils/Authenticate'

export default class PersonalListRoute extends Authenticate {
  private personalUseCase
  constructor (personalUseCase: personalUseCaseInterface) {
    super()
    this.personalUseCase = personalUseCase
  }

  async route (httpRequest: listHttpRequest) {
    try {
      if (!httpRequest.headers.authorization) {
        return response(401, 'Unauthorized!')
      }
      const auth = await this.authenticate(httpRequest.headers.authorization)
      if (!auth) return response(401, 'Unauthorized!')

      if (!httpRequest.params.id) {
        return response(400, 'invalid id!')
      }
      const userLoad = await this.personalUseCase.list(httpRequest.params.id)
      if (userLoad) {
        return response(200, userLoad)
      }
      return response(400, 'User not found!')
    } catch (error) {
      return response(error.status, error.message)
    }
  }
}
