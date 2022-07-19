import AuthUseCaseInterface from '../../interface/auth-use-case'
import AuthUseCase from '../../domain/login-service/auth-usecase'
import Encrypter from '../../domain/utils/encrypter'
import TokenJWT from '../../domain/utils/token-jwt'
import GymStudentRepository from '../../infra/repositorios/gym-student-repository'
import PersonalRepository from '../../infra/repositorios/personal-repository'
import LoginRoute from '../../presentation/routes/login/login-route'
import { HttpRequest } from '../../interface/login-httpRequest'
import Personal from '../../infra/database/models/personal-model'
import PersonalUseCase from '../../domain/personal-service/personal-usecase'

let authUseCase: AuthUseCaseInterface
let personal: Personal

describe('Login route test', () => {
  beforeAll(async () => {
    const personalRepository = new PersonalRepository()
    const studentRepository = new GymStudentRepository()
    const encrypter = new Encrypter()
    const tokenGenerator = new TokenJWT()
    authUseCase = new AuthUseCase(personalRepository, studentRepository, encrypter, tokenGenerator)

    const personalData = {
      id: 1,
      name: 'Carlos Teste',
      email: 'carlosteste@email.com',
      password: '12345678@'
    }

    personal = await new PersonalUseCase(personalRepository, encrypter).create(personalData)
  })

  afterAll(async () => {
    await Personal.destroy({ where: { id: 1 } })
  })

  it('Should login successfully', async () => {
    const httpRequest: HttpRequest = {
      body: {
        email: 'carlosteste@email.com',
        password: '12345678@',
        useType: 'P'
      }
    }

    const response = await new LoginRoute(authUseCase).route(httpRequest)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      access_token: expect.any(String)
    }))
  })

  it('Should not login because email or password is incorrect', async () => {
    const httpRequest: HttpRequest = {
      body: {
        email: 'teste@email.com',
        password: '12345',
        useType: 'P'
      }
    }

    const response = await new LoginRoute(authUseCase).route(httpRequest)

    expect(response.status).toBe(401)
  })
})
