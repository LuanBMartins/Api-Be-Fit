import VideoCreateRoute from '../../../presentation/routes/video/create-route'
import VideoUseCase from '../../../domain/video/video-usecase'
import VideoRepository from '../../../infra/repositorios/video-repository'

export default class VideoCreateRouterComposer {
  static composer () {
    const videoRepository = new VideoRepository()
    const videoUseCase = new VideoUseCase(videoRepository)
    return new VideoCreateRoute(videoUseCase)
  }
}
