import LoginRoute from '../../presentation/routes/login/login-route'
import AuthUseCase from '../../domain/login-service/auth-usecase'
import PersonalRepository from '../../infra/repositorios/personal-repository'
import Encrypter from '../../domain/utils/encrypter'
import TokenJWT from '../../domain/utils/token-jwt'

export default class LoginRouterComposer {
  static composer () {
    const personalRepository = new PersonalRepository()
    const studentRepository = {}
    const encrypter = new Encrypter()
    const tokenGenerator = new TokenJWT()
    const authUseCase = new AuthUseCase(personalRepository, studentRepository, encrypter, tokenGenerator)

    return new LoginRoute(authUseCase)
  }
}
