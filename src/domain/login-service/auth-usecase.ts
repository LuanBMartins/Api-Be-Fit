import GymStudentRepositoryInterface from '../../interface/gym-student/gym-student-repository'
import PersonalRepository from '../../interface/personal-model'
import Encrypter from '../../interface/encrypter'
import ErrorRes from '../../presentation/utils/error'
import Personal from '../../infra/database/models/personal-model'
import GymStudent from '../../infra/database/models/gym-student-model'
import TokenJWT from '../../interface/jwt'

export default class AuthUseCase {
  private personalRepository
  private studentRepository
  private encrypter
  private tokenGenerator

  constructor (
    personalRepository: PersonalRepository,
    studentRepository: GymStudentRepositoryInterface,
    encrypter: Encrypter,
    tokenGenerator: TokenJWT
  ) {
    this.personalRepository = personalRepository
    this.studentRepository = studentRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async autenticate (email: string, password: string, useType: string): Promise<PersonalRepository | {}> {
    if (!email) {
      throw new ErrorRes(400, 'Invalid Email!')
    }
    if (!password) {
      throw new ErrorRes(400, 'Invalid Password!')
    }
    if (!useType || (useType !== 'P' && useType !== 'G')) {
      throw new ErrorRes(400, 'Invalid User!')
    }

    let user: Personal | GymStudent | null
    if (useType === 'P') { user = await this.personalRepository.load(email) } else { user = await this.studentRepository.load(email) }

    if (user === null) { throw new ErrorRes(401, 'Unauthorized') }

    const authValid = await this.encrypter.compare(password, user?.password || '')
    console.log('testee', authValid)

    if (!authValid) {
      throw new ErrorRes(401, 'Unauthorized')
    }

    return this.tokenGenerator.generate(user, useType)
  }
}
