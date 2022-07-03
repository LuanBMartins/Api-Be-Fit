import Video from '../database/models/video-model'

export default class VideoRepository {
  async create (data: any) {
    return await Video.create(data)
  }

  async list (category: string, id: number) {
    return await Video.findAll({
      where: { category, PersonalId: id },
      raw: true
    })
  }

  async listAll (id: number) {
    return await Video.findAll({
      where: { PersonalId: id },
      raw: true
    })
  }

  async delete (id: number) {
    return await Video.destroy({
      where: { id }
    })
  }

  async update (id: number, data: any) {
    return await Video.update(data, {
      where: { id }
    })
  }
}
