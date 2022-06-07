import Encrypter from '../../../domain/utils/encrypter'
import PersonalUseCase from '../../../domain/personal-service/personal-usecase'
import PersonalRepository from '../../../infra/repositorios/personal-repository'
import PersonalRoute from '../../../presentation/routes/personal/load-route'

export default class PersonalRouterComposer {
  static composer () {
    const encrypter = new Encrypter()
    const personalRepository = new PersonalRepository()
    const personalUseCase = new PersonalUseCase(personalRepository, encrypter)
    return new PersonalRoute(personalUseCase)
  }
}
