import CreateHttpRequest from '../../../interface/video/video-httpRequest'
import WorkoutUseCaseInterface from '../../../interface/workout/workout-usecase'
import response from '../../utils/responseBody'
import Authenticate from '../../utils/Authenticate'

export default class WorkoutDeleteRoute extends Authenticate {
  private workoutUseCase
  constructor (videoUseCase: WorkoutUseCaseInterface) {
    super()
    this.workoutUseCase = videoUseCase
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

      if (!httpRequest.params.id) {
        return response(400, 'invalid id')
      }

      const workoutDelete = await this.workoutUseCase.delete(httpRequest.params.id)

      if (workoutDelete) {
        return response(200, 'treino Removido com successo!')
      }
      return response(404, 'Nenhum ação realizada!')
    } catch (error) {
      console.log(error)

      return response(error.status, error.message)
    }
  }
}
