import PersonalLoadRoute from '../list-route'
import Encrypter from '../../../../domain/utils/encrypter'
import PersonalRepository from '../../../../infra/repositorios/personal-repository'
import PersonalUseCase from '../../../../domain/personal-service/personal-usecase'
import Authenticate from '../../../utils/Authenticate'

const mockPersonalUseCase: jest.SpyInstance = jest.spyOn(PersonalUseCase.prototype, 'list')
const mockAuthenticate: jest.SpyInstance = jest.spyOn(Authenticate.prototype, 'authenticate')
const sut = async () => {
  const encrypter = new Encrypter()
  const personalRepository = new PersonalRepository()
  const personalUseCase = new PersonalUseCase(personalRepository, encrypter)
  return new PersonalLoadRoute(personalUseCase)
}

const mockUser = {
  id: 1,
  name: 'Henrique',
  email: 'henrique@email.com',
  password: '$2b$08$Ds3HW3C8y7lacAhGkyor1OUexRXFmCvcIl3NvX8qcREnQ2FSZMAlq',
  score: 0
}

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
    id: 1,
    email: 'teste@email.com'
  },
  headers: {
    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkhlbnJpcXVlIiwiZW1haWwiOiJoZW5yaXF1ZUBlbWFpbC5jb20iLCJzY29yZSI6MCwidXNlVHlwZSI6IlAiLCJpYXQiOjE2NTgxMjM3NTAsImV4cCI6MTc0NDQzNzM1MH0.KN15tVpxwTLKsU2Gw5Pp2yiFsFkM5SZ1Z3swkXDhnu4'
  }
}

describe('Personal list-route test', () => {
  beforeAll(() => {
    mockPersonalUseCase.mockImplementation(async () => Promise.resolve(mockUser))
  })
  it('Deve retornar não autorizado quando o campo authorization não é enviado no request!', async () => {
    const personalRoute = await sut()
    delete mockRequest.headers.authorization
    const response = await personalRoute.route(mockRequest)
    expect(response).toStrictEqual({ status: 401, body: 'Unauthorized!' })

    mockRequest.headers.authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkhlbnJpcXVlIiwiZW1haWwiOiJoZW5yaXF1ZUBlbWFpbC5jb20iLCJzY29yZSI6MCwidXNlVHlwZSI6IlAiLCJpYXQiOjE2NTgxMjM3NTAsImV4cCI6MTc0NDQzNzM1MH0.KN15tVpxwTLKsU2Gw5Pp2yiFsFkM5SZ1Z3swkXDhnu4'
  })
  it('Deve retornar não autenticado quando um token não é valido!', async () => {
    const personalRoute = await sut()
    mockAuthenticate.mockImplementation(async () => Promise.resolve(null))
    const response = await personalRoute.route(mockRequest)
    expect(response).toStrictEqual({ status: 401, body: 'Unauthorized!' })

    mockAuthenticate.mockImplementation(async () => Promise.resolve(mockAuth))
  })
  it('Deve retornar erro de parametro caso o id não seja informado!', async () => {
    const personalRoute = await sut()
    delete mockRequest.params.id
    const response = await personalRoute.route(mockRequest)
    expect(response).toStrictEqual({ status: 400, body: 'invalid id!' })

    mockRequest.params.id = 1
  })
  it('Deve retornar um usuário caso ele seja encontrado na base de dados', async () => {
    const personalRoute = await sut()
    const response = await personalRoute.route(mockRequest)
    expect(response.body).toStrictEqual(mockUser)
  })
  it('Deve retornar status 400, caso não encontre um usuário', async () => {
    const personalRoute = await sut()
    mockPersonalUseCase.mockImplementation(async () => Promise.resolve(null))
    const response = await personalRoute.route(mockRequest)
    expect(response.status).toBe(400)

    mockPersonalUseCase.mockImplementation(async () => Promise.resolve(mockUser))
  })
})
