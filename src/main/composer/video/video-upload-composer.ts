import VideoUploadRoute from '../../../presentation/routes/video/upload-route'
import VideoUseCase from '../../../domain/video/video-usecase'
import VideoRepository from '../../../infra/repositorios/video-repository'

export default class VideoUpdateRouterComposer {
  static composer () {
    const videoRepository = new VideoRepository()
    const videoUseCase = new VideoUseCase(videoRepository)
    return new VideoUploadRoute(videoUseCase)
  }
}
