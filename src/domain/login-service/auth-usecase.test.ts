import GymStudentRepository from '../../infra/repositorios/gym-student-repository'
import PersonalRepository from '../../infra/repositorios/personal-repository'
import Encrypter from '../utils/encrypter'
import TokenJWT from '../utils/token-jwt'
import AuthUseCase from './auth-usecase'

const personalRepository = new PersonalRepository()
const studentRepository = new GymStudentRepository()
const encrypter = new Encrypter()
const tokenGenerator = new TokenJWT()

const user = {
  id: 1,
  name: 'Henrique',
  email: 'henrique@email.com',
  password: '$2b$08$Ds3HW3C8y7lacAhGkyor1OUexRXFmCvcIl3NvX8qcREnQ2FSZMAlq',
  score: 0
}

const mLoadPersonal: jest.SpyInstance = jest.spyOn(PersonalRepository.prototype, 'load')

describe('Login test', () => {
  beforeAll(() => {
    mLoadPersonal.mockImplementation(() => user)
  })
  afterAll(() => {
    mLoadPersonal.mockReset()
  })
  it('Should login successfully', async () => {
    const body = {
      email: 'henrique@email.com',
      password: '12345',
      type: 'P'
    }
    const mToken:jest.SpyInstance = jest.spyOn(TokenJWT.prototype, 'generate')

    mToken.mockImplementation(() => Promise.resolve('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkhlbnJpcXVlIiwiZW1haWwiOiJoZW5yaXF1ZUBlbWFpbC5jb20iLCJzY29yZSI6MCwidXNlVHlwZSI6IlAiLCJpYXQiOjE2NTgxMjM3NTAsImV4cCI6MTc0NDQzNzM1MH0.KN15tVpxwTLKsU2Gw5Pp2yiFsFkM5SZ1Z3swkXDhnu4'))
    const token = await new TokenJWT().generate(user, 'P')
    const response = await new AuthUseCase(personalRepository, studentRepository, encrypter, tokenGenerator)
      .autenticate(body.email, body.password, body.type)

    expect(response).toBe(token)
    mToken.mockReset()
  })
})
