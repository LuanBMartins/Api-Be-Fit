import PersonalRepository from '../../interface/personal-model'

export default class PersonalUseCase {
  private personalRepository

  constructor (
    personalRepository: PersonalRepository
  ) {
    this.personalRepository = personalRepository
  }

  /**
   * Update the personal
   * @param id Id of the personal
   * @param data Name, password or email of the personal
   * @returns Return
   */

  async update (id: number, data: object) {
    const result = await this.personalRepository.update(id, data)
    return result
  }
}
