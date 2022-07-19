import GymStudentCreateRoute from '../../presentation/routes/gym-student/create-route'
import Encrypter from '../../domain/utils/encrypter'
import Personal from '../../infra/database/models/personal-model'
import GymStudentRepository from '../../infra/repositorios/gym-student-repository'
import GymStudentUseCase from '../../domain/gym-student/gym-student-usecase'
import PersonalUseCase from '../../domain/personal-service/personal-usecase'
import PersonalRepository from '../../infra/repositorios/personal-repository'
import TokenJWT from '../../domain/utils/token-jwt'
import gymStudent from '../../infra/database/models/gym-student-model'

let personal: Personal
const personalRepository = new PersonalRepository()
const gymStudentRepository = new GymStudentRepository()
const encrypter = new Encrypter()
let token: string

describe('Gym student routes test', () => {
  beforeAll(async () => {
    const personalData = {
      id: 1,
      name: 'Carlos Teste',
      email: 'carlosteste@email.com',
      password: '12345678@'
    }

    personal = (await new PersonalUseCase(personalRepository, encrypter).create(personalData))

    token = new TokenJWT().generate({ ...personal, useType: 'P' }, 'P')
  })
  afterAll(async () => {
    await Personal.destroy({ where: { id: 1 } })
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
})
