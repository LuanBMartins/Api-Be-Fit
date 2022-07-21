import DataStudentRepositoryInterface from '../../interface/data-student/data-student-repository'
import DataStudentModelInterface from '../../interface/data-student/data-student-model'
import ErrorRes from '../../presentation/utils/error'

export default class DataStudentUseCase {
  private dataStudentRepository

  constructor (dataStudentRepository: DataStudentRepositoryInterface) {
    this.dataStudentRepository = dataStudentRepository
  }

  async list (id: number) {
    if (!id) {
      throw new ErrorRes(400, 'invalid field id!')
    }
    return this.dataStudentRepository.list(id)
  }

  async create (dataStudent: DataStudentModelInterface) {
    const result = await this.dataStudentRepository.create(dataStudent)
    return result
  }
}
