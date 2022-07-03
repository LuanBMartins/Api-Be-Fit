import VideoRepositoryInterface from '../../interface/video/video-repository'
import VideoModelInterface from '../../interface/video/video-model'
import ErrorRes from '../../presentation/utils/error'
import formParse from './form-req'

export default class VideoUseCase {
  private videoRepositoryInterface

  constructor (videoRepositoryInterface: VideoRepositoryInterface) {
    this.videoRepositoryInterface = videoRepositoryInterface
  }

  async create (data: any) {
    return this.videoRepositoryInterface.create(data)
  }

  async list (category: string, id: number) {
    if (!category || !id) {
      throw new ErrorRes(400, 'invalid field category or Id!')
    }
    return this.videoRepositoryInterface.list(category, id)
  }

  async listAll (id: number) {
    if (!id) {
      throw new ErrorRes(400, 'invalid field category or Id!')
    }
    return this.videoRepositoryInterface.listAll(id)
  }

  async delete (id: number) {
    if (!id) {
      throw new ErrorRes(400, 'invalid field id!')
    }
    return this.videoRepositoryInterface.delete(id)
  }

  async update (id: number, dataVideo: VideoModelInterface) {
    const result = await this.videoRepositoryInterface.update(id, dataVideo)
    return result
  }

  async upload (req: any) {
    const awsUpload = await formParse(req)

    return awsUpload
  }
}
