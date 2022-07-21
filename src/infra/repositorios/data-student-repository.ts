import DataStudent from '../database/models/data-student-model'

export default class DataStudentRepository {
  list (id: number) {
    return DataStudent.findAll({
      where: { gymStudentId: id },
      raw: true
    })
  }

  async create (data: any) {
    return DataStudent.create(data)
  }
}
