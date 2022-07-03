import VideoUpdateRoute from '../../../presentation/routes/video/update-route'
import VideoUseCase from '../../../domain/video/video-usecase'
import VideoRepository from '../../../infra/repositorios/video-repository'

export default class VideoUpdateRouterComposer {
  static composer () {
    const videoRepository = new VideoRepository()
    const videoUseCase = new VideoUseCase(videoRepository)
    return new VideoUpdateRoute(videoUseCase)
  }
}
