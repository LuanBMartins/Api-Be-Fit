import CreateHttpRequest from '../../../interface/video/video-httpRequest'
import VideoUseCaseInterface from '../../../interface/video/video-usecase'
import response from '../../utils/responseBody'
import Authenticate from '../../utils/Authenticate'

export default class VideoDeleteRoute extends Authenticate {
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

      if (!httpRequest.params.id) {
        return response(400, 'invalid id')
      }

      const videoDelete = await this.videoUseCase.delete(httpRequest.params.id)

      if (videoDelete) {
        return response(200, 'Video Removido com successo!')
      }
      return response(404, 'Nenhum ação realizada!')
    } catch (error) {
      console.log(error)

      return response(error.status, error.message)
    }
  }
}
