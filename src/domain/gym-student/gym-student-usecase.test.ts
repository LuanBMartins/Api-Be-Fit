import DataStudentRepository from '../../infra/repositorios/data-student-repository'

describe('Data student use case test', () => {
  beforeAll(() => {
    const mockStudent:jest.SpyInstance = jest.spyOn(DataStudentRepository.prototype, 'list')
  })

  it('Should create gym student', async () => {

  })
  it('Should laod gym student', async () => {

  })
})
