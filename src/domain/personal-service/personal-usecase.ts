import ErrorRes from '../../../src/presentation/utils/error'
import PersonalRepository from '../../interface/personal-model'
import Encrypter from '../../interface/encrypter'

export default class PersonalUseCase {
  private personalRepository
  private encrypter

  constructor (
    personalRepository: PersonalRepository,
    encrypter: Encrypter
  ) {
    this.personalRepository = personalRepository
    this.encrypter = encrypter
  }

  async create (data: any) {
    data.password = await this.encrypter.hash(data.password)
    return this.personalRepository.create(data)
  }

  async load (email: string) {
    if (!email) {
      throw new ErrorRes(500, 'invalid field email!')
    }
    return await this.personalRepository.load(email)
  }

  async list (id: number) {
    if (!id) {
      throw new ErrorRes(500, 'invalid field id!')
    }
    return await this.personalRepository.list(id)
  }

  /**
   * Update the personal
   * @param id Id of the personal
   * @param data Name, password or email of the personal
   * @returns Return
   */

  async update (id: number, data: any) {
    if (!id) {
      throw new ErrorRes(500, 'invalid field id!')
    }
    if (data.password && data.password.trim() === 0) {
      throw new ErrorRes(500, 'Password can not be empty!')
    }

    const dataPersonal = data.password
      ? {
          name: data.name,
          password: await this.encrypter.hash(data.password)
        }
      : { name: data.name }

    const result = await this.personalRepository.update(id, dataPersonal)
    return result
  }
}
