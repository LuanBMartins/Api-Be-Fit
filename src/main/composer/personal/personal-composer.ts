import PersonalUseCase from '../../../domain/personal-service/personal-usecase'
import PersonalRepository from '../../../infra/repositorios/personal-repository'
import PersonalRoute from '../../../presentation/routes/personal/personal-update-route'

export default class PersonalRouterComposer {
  static composer () {
    const personalRepository = new PersonalRepository()
    const personalUseCase = new PersonalUseCase(personalRepository)
    return new PersonalRoute(personalUseCase)
  }
}
