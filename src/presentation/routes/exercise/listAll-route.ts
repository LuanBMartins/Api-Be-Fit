import CreateHttpRequest from '../../../interface/video/video-httpRequest'
import ExerciseUseCase from '../../../interface/workout/workout-usecase'
import response from '../../utils/responseBody'
import Authenticate from '../../utils/Authenticate'

export default class WorkoutUpdateRoute extends Authenticate {
  private workoutUseCase
  constructor (workoutUseCase: ExerciseUseCase) {
    super()
    this.workoutUseCase = workoutUseCase
  }

  async route (httpRequest: CreateHttpRequest) {
    try {
      const authenticate = await this.authenticate(httpRequest.headers.authorization)
      if (!authenticate) {
        return {
          status: 401,
          body: 'Unauthorized'
        }
      }

      const workoutList = await this.workoutUseCase.listAll(httpRequest.params.id)

      if (workoutList) {
        return response(200, workoutList)
      }
      return response(404, 'Nenhum ação realizada!')
    } catch (error) {
      console.log(error)

      return response(error.status, error.message)
    }
  }
}
