import GymStudentCreateRoute from '../../presentation/routes/gym-student/create-route'
import Encrypter from '../../domain/utils/encrypter'
import Personal from '../../infra/database/models/personal-model'
import GymStudentRepository from '../../infra/repositorios/gym-student-repository'
import GymStudentUseCase from '../../domain/gym-student/gym-student-usecase'
import PersonalUseCase from '../../domain/personal-service/personal-usecase'
import PersonalRepository from '../../infra/repositorios/personal-repository'
import TokenJWT from '../../domain/utils/token-jwt'
import gymStudent from '../../infra/database/models/gym-student-model'
import GymStudentDeleteRoute from '../../presentation/routes/gym-student/delete-route'
import GymStudentListAllRoute from '../../presentation/routes/gym-student/listAll-route'
import GymStudentUpdateRoute from '../../presentation/routes/gym-student/update-route'

let personal: Personal
const personalRepository = new PersonalRepository()
const gymStudentRepository = new GymStudentRepository()
const encrypter = new Encrypter()
let token: string

describe('Gym student routes test', () => {
  beforeAll(async () => {
    const personalData = {
      name: 'Carlos Teste',
      email: 'carlostestee@email.com',
      password: '12345678@',
      score: 0
    }

    personal = await new PersonalUseCase(personalRepository, encrypter).create(personalData)

    token = new TokenJWT().generate({ ...personal, useType: 'P' }, 'P')
  })
  afterAll(async () => {
    await Personal.destroy({ where: { id: personal.id } })
  })
  it('Should create a gym student', async () => {
    const gymStudentUseCase = new GymStudentUseCase(gymStudentRepository, encrypter)
    const httpRequest = {
      body: {
        id: 1,
        name: 'Eren Yeager',
        email: 'eren@email.com',
        password: '12345678@',
        goals: 'Destruir o mundo',
        PersonalId: personal.id
      },
      headers: {
        authorization: token
      },
      params: { id: personal.id }
    }

    const response = await new GymStudentCreateRoute(gymStudentUseCase).route(httpRequest)
    expect(response.status).toBe(200)

    await gymStudent.destroy({ where: { email: httpRequest.body.email } })
  })

  it('Should delete a gym student', async () => {
    const gymStudentUseCase = new GymStudentUseCase(gymStudentRepository, encrypter)
    const httpRequest = {
      body: {
        id: 1,
        name: 'Eren Yeager',
        email: 'eren@email.com',
        password: '12345678@',
        goals: 'Destruir o mundo',
        PersonalId: personal.id
      },
      headers: {
        authorization: token
      },
      params: { id: personal.id }
    }

    await new GymStudentCreateRoute(gymStudentUseCase).route(httpRequest)

    const gymStudentUseCaseDelete = new GymStudentUseCase(gymStudentRepository, encrypter)
    const httpRequestDelete = {
      headers: { authorization: token },
      body: { id: 1 }
    }

    const responseDeleted = await new GymStudentDeleteRoute(gymStudentUseCaseDelete).route(httpRequestDelete)

    expect(responseDeleted.status).toBe(200)
  })

  it('Should list all gym students', async () => {
    const gymStudentUseCase = new GymStudentUseCase(gymStudentRepository, encrypter)
    const gymStudentFirst = {
      id: 1,
      name: 'Eren Yeager',
      email: 'eren@email.com',
      password: '12345678@',
      goals: 'Destruir o mundo',
      PersonalId: personal.id,
      confirmed: false
    }

    const gymStudentSecond = {
      id: 2,
      name: 'Hatake Kakashi',
      email: 'kakashi@email.com',
      password: '12345678@',
      goals: 'Proteger aldeia da folha',
      PersonalId: personal.id,
      confirmed: false
    }

    const httpRequestFirst = {
      body: gymStudentFirst,
      headers: {
        authorization: token
      }
    }
    const httpRequestSecond = {
      body: gymStudentSecond,
      headers: {
        authorization: token
      }
    }

    await new GymStudentCreateRoute(gymStudentUseCase).route(httpRequestFirst)
    await new GymStudentCreateRoute(gymStudentUseCase).route(httpRequestSecond)

    const response = await new GymStudentListAllRoute(gymStudentUseCase).route({
      headers: { authorization: token },
      params: { id: personal.id }
    })

    expect(response.status).toBe(200)
  })

  it('Should update a gym student', async () => {
    token = new TokenJWT().generate({ ...personal, useType: 'G' }, 'G')
    const gymStudentUseCase = new GymStudentUseCase(gymStudentRepository, encrypter)
    const httpRequestCreate = {
      body: {
        id: 1,
        name: 'Eren Yeager',
        email: 'eren@email.com',
        password: '12345678@',
        goals: 'Destruir o mundo',
        PersonalId: personal.id
      },
      headers: {
        authorization: token
      },
      params: { id: personal.id }
    }

    const httpRequestUpdate = {
      body: {
        name: 'Eren Yeager Shingeki'
      },
      headers: {
        authorization: token
      },
      params: { id: 1 }
    }

    await new GymStudentCreateRoute(gymStudentUseCase).route(httpRequestCreate)

    const response = await new GymStudentUpdateRoute(gymStudentUseCase).route(httpRequestUpdate)

    expect(response.status).toBe(200)

    await gymStudent.destroy({ where: { email: httpRequestCreate.body.email } })
  })
})
