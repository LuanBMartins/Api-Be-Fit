import CreateHttpRequest from '../../../interface/video/video-httpRequest'
import VideoUseCaseInterface from '../../../interface/video/video-usecase'
import response from '../../utils/responseBody'
import schema from './validator/list-validate'
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

      if (!httpRequest.body) {
        return response(400, 'invalid body!')
      }

      const { error } = schema.validate(httpRequest.body)

      if (error) return response(400, error.details[0].message)

      const videoList = await this.videoUseCase.list(httpRequest.body.category, httpRequest.body.id)

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
