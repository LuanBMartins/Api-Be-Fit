import CreateHttpRequest from '../../../interface/video/video-httpRequest'
import VideoUseCaseInterface from '../../../interface/video/video-usecase'
import response from '../../utils/responseBody'
import Authenticate from '../../utils/Authenticate'

export default class VideoUpdateRoute extends Authenticate {
  private videoUseCase
  constructor (videoUseCase: VideoUseCaseInterface) {
    super()
    this.videoUseCase = videoUseCase
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

      const videoList = await this.videoUseCase.listAll(httpRequest.params.id)

      if (videoList) {
        return response(200, videoList)
      }
      return response(404, 'Nenhum ação realizada!')
    } catch (error) {
      console.log(error)

      return response(error.status, error.message)
    }
  }
}
