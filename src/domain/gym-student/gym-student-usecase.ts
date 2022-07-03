import GymStudentRepositoryInterface from '../../interface/gym-student/gym-student-repository'
import GymStudentModelInterface from '../../interface/gym-student/gym-student-model'
import Encrypter from '../../interface/encrypter'
import ErrorRes from '../../presentation/utils/error'
import Mail from '../utils/mail'
import TokenJWT from '../utils/token-jwt'
import PasswordGenerator from '../utils/password-generator'

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
    try {
      this.validStudentData(gymStudent)
      this.gymStudentRepository.create(gymStudent)
      const emailConfirmationToken = new TokenJWT().generateConfirmationEmail(gymStudent.email)
      const mailInfo = {
        to: gymStudent.email,
        subject: 'Email Confirmation',
        text: `Please, click this link to confirm your email ${process.env.URL_API}/${emailConfirmationToken}`,
        html: `<h1>Please, click this link to confirm your email </h1> <a href=${process.env.URL_API}/${emailConfirmationToken}>Confirmation link</a>`
      }
      const mail = await new Mail(mailInfo.to, mailInfo.subject, mailInfo.text, mailInfo.html).sendMail()

      if (!mail) {
        return false
      }
      return mail
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }

    // gymStudent.password = await this.encrypter.hash(gymStudent.password)
  }

  /**
   *
   * @param id student id
   * @returns boolean
   */

  load (id: number) {
    if (!id) {
      throw new ErrorRes(500, 'invalid field id!')
    }
    return this.gymStudentRepository.list(id)
  }

  /**
   *

   * @param id student id
   * @param gymStudent gym student data
   * @returns
   */

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
  }

  /**
   *
   * @param id student id
   * @returns
   */

  delete (id: number) {
    if (!id) {
      throw new ErrorRes(400, 'invalid field id!')
    }
    return this.gymStudentRepository.delete(id)
  }

  listStudentforPersonal (id: number) {
    if (!id) {
      throw new ErrorRes(400, 'invalid field id!')
    }
    return this.gymStudentRepository.listStudentsForPersonal(id)
  }

  async emailConfirmation (email: string) {
    const password = PasswordGenerator.generate()
    const passwordEncrypted = await this.encrypter.hash(password)
    const mailInfo = {
      to: email,
      subject: 'Confirmação de email',
      text: `Essa é sua senha ${password}`,
      html: `<h1>Essa é sua senha </h1> <h2><strong>${password}</strong></h2>`
    }
    await new Mail(mailInfo.to, mailInfo.subject, mailInfo.text, mailInfo.html).sendMail()

    return this.gymStudentRepository.emailConfirmation(email, passwordEncrypted)
  }
}
