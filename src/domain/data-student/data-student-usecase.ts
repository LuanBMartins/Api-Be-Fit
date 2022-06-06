import DataStudentRepositoryInterface from '../../interface/data-student/data-student-repository'
import DataStudentModelInterface from '../../interface/data-student/data-student-model'
import Encrypter from '../../interface/encrypter'
import ErrorRes from '../../presentation/utils/error'

export default class DataStudentUseCase {
  private dataStudentRepository
  private encrypter

  constructor (dataStudentRepository: DataStudentRepositoryInterface, encrypter: Encrypter) {
    this.dataStudentRepository = dataStudentRepository
    this.encrypter = encrypter
  }

  async create (dataStudent: DataStudentModelInterface) {

  }

  async load (id: number) {

  }

  async update (id: number, dataStudent: DataStudentModelInterface) {

  }
}
