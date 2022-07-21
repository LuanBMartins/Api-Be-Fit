// import { HttpRequest } from 'src/interface/login-httpRequest'
import Authenticate from '../../utils/Authenticate'
import PersonalCaseInterface from 'src/interface/personal-usecase'

export default class PersonalRoute extends Authenticate {
  private personalUseCase

  constructor (personalUseCase: PersonalCaseInterface) {
    super()
    this.personalUseCase = personalUseCase
  }

  /**
   * Call the method on the
   * @param httpRequest The request object
   * @returns Return
   */

  async route (httpRequest: any) {
    try {
      const authenticate = await this.authenticate(httpRequest.headers.authorization)
      if (!authenticate) {
        return {
          status: 401,
          body: 'Unauthorized'
        }
      }

      const personal = await this.personalUseCase.update(httpRequest.params.id, httpRequest.body)
      if (!personal) {
        return {
          status: 400,
          body: 'Personal Not Found'
        }
      }

      return {
        status: 200,
        body: 'Updated'
      }
    } catch (error) {
      return error
    }
  }
}
