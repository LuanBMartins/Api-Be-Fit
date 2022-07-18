import CreateHttpRequest from '../../../interface/video/video-httpRequest'
import ExerciseUseCaseInterface from '../../../interface/exercise/exercise-usecase'
import response from '../../utils/responseBody'
import Authenticate from '../../utils/Authenticate'

export default class ExerciseDeleteRoute extends Authenticate {
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

      if (!httpRequest.params.id) {
        return response(400, 'invalid id')
      }

      const exerciseDelete = await this.exerciseUseCase.delete(httpRequest.params.id)

      if (exerciseDelete) {
        return response(200, 'treino Removido com successo!')
      }
      return response(404, 'Nenhum ação realizada!')
    } catch (error) {
      console.log(error)

      return response(error.status, error.message)
    }
  }
}
