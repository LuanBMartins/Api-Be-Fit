import CreateHttpRequest from '../../../interface/video/video-httpRequest'
import VideoUseCaseInterface from '../../../interface/video/video-usecase'
import response from '../../utils/responseBody'
import schema from './validator/update-validate'
import Authenticate from '../../utils/Authenticate'

export default class VideoUpdateRoute extends Authenticate {
  private videoUseCase
  constructor (videoUseCase: VideoUseCaseInterface) {
    super()
    this.videoUseCase = videoUseCase
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

      if (!httpRequest.params.id) {
        return response(400, 'invalid id')
      }

      const { error } = schema.validate(httpRequest.body)

      if (error) return response(400, error.details[0].message)

      const videoUpdate = await this.videoUseCase.update(httpRequest.params.id, httpRequest.body)

      if (videoUpdate[0] !== 0) {
        return response(200, 'Video atualizado com successo!')
      }
      return response(404, 'Nenhum ação realizada!')
    } catch (error) {
      console.log(error)

      return response(error.status, error.message)
    }
  }
}
