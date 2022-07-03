import CreateHttpRequest from '../../../interface/gym-student/gym-student-create-httpRequest'
import VideoUseCaseInterface from '../../../interface/video/video-usecase'
import response from '../../utils/responseBody'
import schema from './validator/create-validate'
import Authenticate from '../../utils/Authenticate'

export default class VideoCreateRoute extends Authenticate {
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

      const { error } = schema.validate(httpRequest.body)

      if (error) return response(400, error.details[0].message)

      const videoCreate = await this.videoUseCase.create(httpRequest.body)

      if (videoCreate) {
        return response(200, 'Video salvo com successo!')
      }
      return response(500, 'Server Error!')
    } catch (error) {
      console.log(error)

      return response(error.status, error.message)
    }
  }
}
