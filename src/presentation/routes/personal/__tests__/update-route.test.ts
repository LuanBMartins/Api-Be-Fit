import Encrypter from '../../../../domain/utils/encrypter'
import PersonalUseCase from '../../../../domain/personal-service/personal-usecase'
import PersonalRepository from '../../../../infra/repositorios/personal-repository'
import PersonalRoute from '../../../../presentation/routes/personal/update-route'
import Authenticate from '../../../utils/Authenticate'

const mockPersonalUseCase: jest.SpyInstance = jest.spyOn(PersonalUseCase.prototype, 'update')
const mockAuthenticate: jest.SpyInstance = jest.spyOn(Authenticate.prototype, 'authenticate')
const sut = async () => {
  const encrypter = new Encrypter()
  const personalRepository = new PersonalRepository()
  const personalUseCase = new PersonalUseCase(personalRepository, encrypter)
  return new PersonalRoute(personalUseCase)
}

const mockUser = true

const mockAuth = {
  valid: true
}

const mockRequest = {
  body: {
    id: 1,
    name: 'Henrique',
    email: 'henrique@email.com',
    password: '$2b$08$Ds3HW3C8y7lacAhGkyor1OUexRXFmCvcIl3NvX8qcREnQ2FSZMAlq'
  },
  params: {
    id: 1
  },
  headers: {
    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkhlbnJpcXVlIiwiZW1haWwiOiJoZW5yaXF1ZUBlbWFpbC5jb20iLCJzY29yZSI6MCwidXNlVHlwZSI6IlAiLCJpYXQiOjE2NTgxMjM3NTAsImV4cCI6MTc0NDQzNzM1MH0.KN15tVpxwTLKsU2Gw5Pp2yiFsFkM5SZ1Z3swkXDhnu4'
  }
}

describe('Personal update-route test', () => {
  beforeAll(() => {
    mockPersonalUseCase.mockImplementation(async () => Promise.resolve(mockUser))
  })
  it('Deve retornar não autenticado quando um token não é valido!', async () => {
    const personalRoute = await sut()
    mockAuthenticate.mockImplementation(async () => Promise.resolve(null))
    const response = await personalRoute.route(mockRequest)
    expect(response).toStrictEqual({ status: 401, body: 'Unauthorized' })

    mockAuthenticate.mockImplementation(async () => Promise.resolve(mockAuth))
  })
  it('Deve retornar status 400 caso o id não seja encontrado!', async () => {
    const personalRoute = await sut()
    mockPersonalUseCase.mockImplementation(async () => Promise.resolve(false))
    const response = await personalRoute.route(mockRequest)
    expect(response.status).toBe(400)

    mockRequest.params.id = 1
    mockPersonalUseCase.mockImplementation(async () => Promise.resolve(true))
  })
  it('Deve retornar status 200 caso atualização seja realizada', async () => {
    const personalRoute = await sut()
    const response = await personalRoute.route(mockRequest)
    expect(response.status).toBe(200)
  })
})
