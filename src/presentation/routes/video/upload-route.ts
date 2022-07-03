import CreateHttpRequest from '../../../interface/video/video-httpRequest'
import VideoUseCaseInterface from '../../../interface/video/video-usecase'
import response from '../../utils/responseBody'
import Authenticate from '../../utils/Authenticate'

export default class VideoUploadRoute extends Authenticate {
  private videoUseCase
  constructor (videoUseCase: VideoUseCaseInterface) {
    super()
    this.videoUseCase = videoUseCase
  }

  async route (httpRequest: CreateHttpRequest) {
    try {
      const awslink = await this.videoUseCase.upload(httpRequest.req)
      if (!awslink) {
        return {
          status: 400,
          body: 'Falha no upload!'
        }
      }

      return {
        status: 200,
        body: awslink
      }
    } catch (error) {
      console.log(error)

      return response(error.status, error.message)
    }
  }
}
