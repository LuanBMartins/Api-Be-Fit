import VideoListRoute from '../../../presentation/routes/video/list-route'
import VideoUseCase from '../../../domain/video/video-usecase'
import VideoRepository from '../../../infra/repositorios/video-repository'

export default class VideoListRouterComposer {
  static composer () {
    const videoRepository = new VideoRepository()
    const videoUseCase = new VideoUseCase(videoRepository)
    return new VideoListRoute(videoUseCase)
  }
}
