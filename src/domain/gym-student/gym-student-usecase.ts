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
<<<<<<< HEAD
   * @param id student id
   * @returns boolean
   */

  load (id: number) {
    if (!id) {
      throw new ErrorRes(500, 'invalid field id!')
    }
    return this.gymStudentRepository.list(id)
=======
   * @param email student email
   * @returns boolean
   */

  load (email: string) {
    if (!email) {
      throw new ErrorRes(500, 'invalid field email!')
    }
    return this.gymStudentRepository.load(email)
>>>>>>> 40bf0ddaf424faebf47b12a7462ebcbe58abf71f
  }

  /**
   *
<<<<<<< HEAD
   * @param id student id
=======
   * @param email student email
>>>>>>> 40bf0ddaf424faebf47b12a7462ebcbe58abf71f
   * @param gymStudent gym student data
   * @returns
   */

<<<<<<< HEAD
  async update (id: number, gymStudent: GymStudentModelInterface) {
    if (!id) {
      throw new ErrorRes(500, 'invalid field id!')
    }
    // if (!gymStudent.name || !gymStudent.password) {
    //   throw new ErrorRes(500, 'invalid fields!')
    // }

    const dataStudent = gymStudent.password
      ? {
          name: gymStudent.name,
          password: await this.encrypter.hash(gymStudent.password)
        }
      : { name: gymStudent.name }

    return this.gymStudentRepository.update(id, dataStudent)
=======
  update (email: string, gymStudent: GymStudentModelInterface) {
    if (!email) {
      throw new ErrorRes(500, 'invalid field email!')
    }
    if (!gymStudent) {
      throw new ErrorRes(500, 'invalid field email!')
    }
    return this.gymStudentRepository.update(email, gymStudent)
>>>>>>> 40bf0ddaf424faebf47b12a7462ebcbe58abf71f
  }

  /**
   *
<<<<<<< HEAD
   * @param id student id
   * @returns
   */

  delete (id: number) {
    if (!id) {
      throw new ErrorRes(500, 'invalid field id!')
    }
    return this.gymStudentRepository.delete(id)
=======
   * @param email student email
   * @returns
   */

  delete (email: string) {
    if (!email) {
      throw new ErrorRes(500, 'invalid field email!')
    }
    return this.gymStudentRepository.delete(email)
>>>>>>> 40bf0ddaf424faebf47b12a7462ebcbe58abf71f
  }
}
