
import PersonalRepository from '../../interface/personal-model'
import Encrypter from '../../interface/encrypter'
import ErrorRes from '../../presentation/utils/error'
import Personal from '../../infra/database/models/personal-model'
import TokenJWT from '../../interface/jwt'

export default class AuthUseCase {
  private personalRepository
  private studentRepository
  private encrypter
  private tokenGenerator

  constructor (
    personalRepository: PersonalRepository,
    studentRepository: {} | null,
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
    if (!useType) {
      throw new ErrorRes(400, 'Invalid User!')
    }

    let user: Personal | null
    if (useType === 'P') { user = await this.personalRepository.load(email) } else { user = this.studentRepository = null }

    if (user === null) { throw new ErrorRes(401, 'Unauthorized') }

    const authValid = this.encrypter.compare(password, user?.password || '')

    if (!authValid) {
      throw new ErrorRes(401, 'Unauthorized')
    }

    return this.tokenGenerator.generate(user)
  }
}
