import Encrypter from '../../../domain/utils/encrypter'
import PersonalUseCase from '../../../domain/personal-service/personal-usecase'
import PersonalRepository from '../../../infra/repositorios/personal-repository'
import ErrorRes from '../../../presentation/utils/error'

const mockPersonalRepositoryCreate: jest.SpyInstance = jest.spyOn(PersonalRepository.prototype, 'create')
const mockPersonalRepositoryload: jest.SpyInstance = jest.spyOn(PersonalRepository.prototype, 'load')
const mockPersonalRepositorylist: jest.SpyInstance = jest.spyOn(PersonalRepository.prototype, 'list')
const mockPersonalRepositoryupdate: jest.SpyInstance = jest.spyOn(PersonalRepository.prototype, 'update')
const mockEncrypter: jest.SpyInstance = jest.spyOn(Encrypter.prototype, 'hash')
const sut = async () => {
  const encrypter = new Encrypter()
  const personalRepository = new PersonalRepository()
  return new PersonalUseCase(personalRepository, encrypter)
}

const mockUser = [{
  id: 1,
  name: 'Henrique',
  email: 'henrique@email.com',
  password: '$2b$08$Ds3HW3C8y7lacAhGkyor1OUexRXFmCvcIl3NvX8qcREnQ2FSZMAlq',
  score: 0
}]

describe('Personal update-route test', () => {
  beforeAll(() => {
    mockPersonalRepositoryCreate.mockImplementation(async () => Promise.resolve(mockUser[0]))
    mockPersonalRepositoryload.mockImplementation(async () => Promise.resolve(mockUser))
    mockPersonalRepositorylist.mockImplementation(async () => Promise.resolve(mockUser[0]))
    mockPersonalRepositoryupdate.mockImplementation(async () => Promise.resolve(true))
    mockEncrypter.mockImplementation(async () => Promise.resolve(mockUser))
  })
  it('deve retornar um usuario criado', async () => {
    const personal = await sut()
    const response = await personal.create(mockUser[0])
    expect(response).toStrictEqual(mockUser[0])
  })
  it('deve retornar um erro caso email não seja passado corretamente!', async () => {
    const personal = await sut()
    try {
      await personal.load('')
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorRes)
    }
  })
  it('deve retornar um array caso registros sejas encontrado!', async () => {
    const personal = await sut()
    const response = await personal.load('henrique@email.com')
    expect(response).toStrictEqual(mockUser)
  })
  it('deve retornar um registro!', async () => {
    const personal = await sut()
    const response = await personal.list(1)
    expect(response).toStrictEqual(mockUser[0])
  })
  it('deve retornar true para a atualização!', async () => {
    const personal = await sut()
    const response = await personal.update(1, mockUser[0])
    expect(response).toBe(true)
  })
})
