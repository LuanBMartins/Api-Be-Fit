import DataStudentRepository from '../../infra/repositorios/data-student-repository'

const dataStudent = {
  id: 1,
  weight: 0,
  height: 0,
  arms: 0,
  legs: 0,
  waist: 0,
  chest: 0,
  gymStudentId: 1
}

const mockStudent:jest.SpyInstance = jest.spyOn(DataStudentRepository.prototype, 'list')

describe('Data student use case test', () => {
  beforeAll(() => {
    mockStudent.mockImplementation(async () => Promise.resolve(dataStudent))
  })
  afterAll(() => {
    mockStudent.mockReset()
  })

  it('Should create student', async () => {
    const gymStudentId = 1
    const response = await new DataStudentRepository().list(gymStudentId)

    expect(response).toBe(dataStudent)
  })
  it('Should list student', async () => {
    const mCreateDataStudent: jest.SpyInstance = jest.spyOn(DataStudentRepository.prototype, 'create')
    mCreateDataStudent.mockImplementation(async () => Promise.resolve(dataStudent))

    const response = await new DataStudentRepository().create(dataStudent)

    expect(response).toBe(dataStudent)
    mCreateDataStudent.mockReset()
  })
})
