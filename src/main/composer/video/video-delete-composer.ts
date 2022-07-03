import VideoDeleteRoute from '../../../presentation/routes/video/delete-route'
import VideoUseCase from '../../../domain/video/video-usecase'
import VideoRepository from '../../../infra/repositorios/video-repository'

export default class VideoDeleteRouterComposer {
  static composer () {
    const videoRepository = new VideoRepository()
    const videoUseCase = new VideoUseCase(videoRepository)
    return new VideoDeleteRoute(videoUseCase)
  }
}
