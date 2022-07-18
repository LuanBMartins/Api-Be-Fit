import CreateHttpRequest from '../../../interface/exercise/exercise-httpbody'
import ExerciseUseCaseInterface from '../../../interface/exercise/exercise-usecase'
import response from '../../utils/responseBody'
import schema from './validator/create-validate'
import Authenticate from '../../utils/Authenticate'

export default class ExerciseCreateRoute extends Authenticate {
  private exerciseUseCase
  constructor (exerciseUseCase: ExerciseUseCaseInterface) {
    super()
    this.exerciseUseCase = exerciseUseCase
  }

  async route (httpRequest: CreateHttpRequest) {
    try {
      const authenticate = await this.authenticate(httpRequest.headers.authorization, 'P')
      if (!authenticate) {
        return {
          status: 401,
          body: 'Unauthorized'
        }
      }

      if (!httpRequest.body) {
        return response(400, 'invalid body!')
      }

      const { error } = schema.validate(httpRequest.body)

      if (error) return response(400, error.details[0].message)

      const exerciseCreate = await this.exerciseUseCase.create(httpRequest.body)

      if (exerciseCreate) {
        return response(200, 'Treino salvo com successo!')
      }
      return response(500, 'Server Error!')
    } catch (error) {
      console.log(error)

      return response(error.status, error.message)
    }
  }
}
