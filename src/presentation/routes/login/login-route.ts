import AuthUseCaseInterface from 'src/interface/auth-use-case'
import { HttpRequest } from 'src/interface/login-httpRequest'
import ErrorRes from '../../utils/error'

export default class LoginRoute {
  private authUseCase

  constructor (authUseCase: AuthUseCaseInterface) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest: HttpRequest) {
    try {
      if (!httpRequest.body.email) {
        throw new ErrorRes(400, 'invalid email field!')
      }
      if (!httpRequest.body.password) {
        throw new ErrorRes(400, 'invalid password field!')
      }

      const res = await this.authUseCase.autenticate(httpRequest.body.email, httpRequest.body.password, httpRequest.body.useType)

      if (!res) {
        return {
          status: 401,
          body: res
        }
      }

      return {
        status: 200,
        body: {
          access_token: res
        }
      }
    } catch (error) {
      return {
        status: 401,
        body: error.message
      }
    }
  }
}
