import Personal from '../database/models/personal-model'

export default class PersonalRepository {
  async load (email: string) {
    const result = await Personal.findOne({
      where: { email },
      raw: true
    })
    return result
  }

  async create (data: any) {
    const result = await Personal.create(data)
    return result
  }

  async update (id: number, data: any) {
    const result = await Personal.findOne({
      where: { id },
      raw: true
    })
    if (result) {
      await Personal.update(data, { where: { id } })
      return true
    } else {
      return false
    }
  }
}
