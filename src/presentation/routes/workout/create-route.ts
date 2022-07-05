import CreateHttpRequest from '../../../interface/workout/workout-httpbody'
import WorkoutUseCaseInterface from '../../../interface/workout/workout-usecase'
import response from '../../utils/responseBody'
import schema from './validator/create-validate'
import Authenticate from '../../utils/Authenticate'

export default class WorkoutCreateRoute extends Authenticate {
  private workoutUseCase
  constructor (workouUseCase: WorkoutUseCaseInterface) {
    super()
    this.workoutUseCase = workouUseCase
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

      const workoutCreate = await this.workoutUseCase.create(httpRequest.body)

      if (workoutCreate) {
        return response(200, 'Treino salvo com successo!')
      }
      return response(500, 'Server Error!')
    } catch (error) {
      console.log(error)

      return response(error.status, error.message)
    }
  }
}
