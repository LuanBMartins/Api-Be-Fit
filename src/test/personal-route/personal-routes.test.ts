import PersonalUseCase from '../../domain/personal-service/personal-usecase'
import Personal from '../../infra/database/models/personal-model'
import PersonalRoute from '../../presentation/routes/personal/update-route'
import Encrypter from '../../domain/utils/encrypter'
import TokenJWT from '../../domain/utils/token-jwt'
import PersonalRepository from '../../infra/repositorios/personal-repository'
import PersonalListRoute from '../../presentation/routes/personal/list-route'
import PersonalLoadRoute from '../../presentation/routes/personal/load-route'

let personal: Personal
const personalRepository = new PersonalRepository()
const encrypter = new Encrypter()
let token: string

describe('Personal routes tests', () => {
  beforeAll(async () => {
    const personalData = {
      id: 1,
      name: 'Carlos Teste',
      email: 'carlostestee@email.com',
      password: '12345678@'
    }

    personal = await new PersonalUseCase(personalRepository, encrypter).create(personalData)

    token = new TokenJWT().generate({ ...personal, useType: 'P' }, 'P')
  })

  afterAll(async () => {
    await Personal.destroy({ where: { id: personal.id } })
  })

  it('Should list personal', async () => {
    const personalUseCase = new PersonalUseCase(personalRepository, encrypter)
    const httpRequest = {
      body: personal,
      headers: {
        authorization: token
      },
      params: { id: personal.id, email: personal.email }
    }
    const response = await new PersonalListRoute(personalUseCase).route(httpRequest)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      id: personal.id,
      email: personal.email,
      password: personal.password,
      score: personal.score
    }))
  })

  it('Should update personal', async () => {
    const personalUseCase = new PersonalUseCase(personalRepository, encrypter)

    const httpRequest = {
      body: {
        name: 'John'
      },
      headers: {
        authorization: token
      },
      params: { id: personal.id }
    }
    const response = await new PersonalRoute(personalUseCase).route(httpRequest)

    expect(response.status).toBe(200)
    expect(response.body).toEqual('Updated')
  })

  it('Should load personal routes', async () => {
    const personalUseCase = new PersonalUseCase(personalRepository, encrypter)
    const httpRequest = {
      body: personal,
      headers: {
        authorization: token
      },
      params: { id: personal.id, email: personal.email }
    }
    const response = await new PersonalLoadRoute(personalUseCase).route(httpRequest)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      id: personal.id,
      email: personal.email,
      password: personal.password,
      score: personal.score
    }))
  })

  it('Should not list because is unauthorized', async () => {
    const personalUseCase = new PersonalUseCase(personalRepository, encrypter)
    const httpRequest = {
      body: personal,
      headers: {
        authorization: ''
      },
      params: { id: personal.id, email: personal.email }
    }
    const response = await new PersonalListRoute(personalUseCase).route(httpRequest)

    expect(response.status).toBe(401)
  })
})
