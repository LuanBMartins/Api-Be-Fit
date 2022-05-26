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
}
