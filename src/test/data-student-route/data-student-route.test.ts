import GymStudentUseCase from '../../domain/gym-student/gym-student-usecase'
import GymStudentCreateRoute from '../../presentation/routes/gym-student/create-route'
import PersonalUseCase from '../../domain/personal-service/personal-usecase'
import Encrypter from '../../domain/utils/encrypter'
import TokenJWT from '../../domain/utils/token-jwt'
import Personal from '../../infra/database/models/personal-model'
import GymStudentRepository from '../../infra/repositorios/gym-student-repository'
import PersonalRepository from '../../infra/repositorios/personal-repository'
import gymStudent from '../../infra/database/models/gym-student-model'
import DataStudent from '../../infra/database/models/data-student-model'
import DataStudentCreateRoute from '../../presentation/routes/data-student/create-route'
import DataStudentUseCase from '../../domain/data-student/data-student-usecase'
import DataStudentRepository from '../../infra/repositorios/data-student-repository'
import dataStudentCreateHttpRequest from 'src/interface/data-student/data-student-create-httpRequest'

let personal: Personal
let gymStudentResult: gymStudent
const personalRepository = new PersonalRepository()
const gymStudentRepository = new GymStudentRepository()
const dataStudentRepository = new DataStudentRepository()
const encrypter = new Encrypter()
let token: string

describe('Data student route test', () => {
  beforeAll(async () => {
    try {
      const personalData = {
        id: 10,
        name: 'Carlos Teste',
        email: 'carlostesteee@email.com',
        password: '12345678@'
      }

      personal = await new PersonalUseCase(personalRepository, encrypter).create(personalData)

      token = new TokenJWT().generate({ ...personal, useType: 'G' }, 'G')

      const gymStudentData = {
        id: 2,
        name: 'Eren Yeager',
        email: 'eren@email.com',
        password: '12345678@',
        goals: 'Destruir o mundo',
        PersonalId: personal.id
      }

      await new GymStudentUseCase(gymStudentRepository, encrypter).create(gymStudentData)
    } catch (error) {
      console.log(error)
    }
  })
  afterAll(async () => {
    await Personal.destroy({ where: { id: 10 } })
    await gymStudent.destroy({ where: { id: 2 } })
  })

  it('Should create a data student', async () => {
    const dataStudentUseCase = new DataStudentUseCase(dataStudentRepository)
    const gymStudentData = await gymStudent.findOne({ where: { id: 2 } })
    const httpRequest: dataStudentCreateHttpRequest = {
      body: {
        id: 2,
        weight: 0,
        height: 0,
        arms: 0,
        legs: 0,
        waist: 0,
        chest: 0,
        gymStudentId: gymStudentData.id
      },
      headers: { authorization: token }

    }

    const response = await new DataStudentCreateRoute(dataStudentUseCase).route(httpRequest)

    expect(response.status).toBe(200)

    await DataStudent.destroy({ where: { id: 1 } })
  })
})
