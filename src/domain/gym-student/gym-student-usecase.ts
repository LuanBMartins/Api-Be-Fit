import GymStudentRepositoryInterface from '../../interface/gym-student/gym-student-repository'
import GymStudentModelInterface from '../../interface/gym-student/gym-student-model'
import Encrypter from '../../interface/encrypter'
import ErrorRes from '../../presentation/utils/error'

export default class GymStudentUseCase {
  private gymStudentRepository
  private encrypter

  constructor (gymStudentRepository: GymStudentRepositoryInterface, encrypter: Encrypter) {
    this.gymStudentRepository = gymStudentRepository
    this.encrypter = encrypter
  }

  /**
   *
   * @param gymStudent gym student data
   */

  validStudentData (gymStudent: GymStudentModelInterface) {
    // validates fields
    const valid = [
      {
        valid: gymStudent.PersonalId,
        msg: 'Invalid field gymStudent.PersonalId'
      },
      {
        valid: gymStudent.email,
        msg: 'Invalid field gymStudent.email'
      },
      {
        valid: gymStudent.goals,
        msg: 'Invalid field gymStudent.goals'
      },
      {
        valid: gymStudent.password,
        msg: 'Invalid field gymStudent.password'
      }
    ]

    valid.forEach(item => {
      if (!item.valid) {
        throw new ErrorRes(400, item.msg)
      }
    })
  }

  /**
   *
   * @param gymStudent gym student data
   */

  async create (gymStudent: GymStudentModelInterface) {
    this.validStudentData(gymStudent)
    gymStudent.password = await this.encrypter.hash(gymStudent.password)
    return this.gymStudentRepository.create(gymStudent)
  }

  /**
   *
   * @param email student email
   * @returns boolean
   */

  load (email: string) {
    if (!email) {
      throw new ErrorRes(500, 'invalid field email!')
    }
    return this.gymStudentRepository.load(email)
  }

  /**
   *
   * @param email student email
   * @param gymStudent gym student data
   * @returns
   */

  update (email: string, gymStudent: GymStudentModelInterface) {
    if (!email) {
      throw new ErrorRes(500, 'invalid field email!')
    }
    if (!gymStudent) {
      throw new ErrorRes(500, 'invalid field email!')
    }
    return this.gymStudentRepository.update(email, gymStudent)
  }

  /**
   *
   * @param email student email
   * @returns
   */

  delete (email: string) {
    if (!email) {
      throw new ErrorRes(500, 'invalid field email!')
    }
    return this.gymStudentRepository.delete(email)
  }
}
