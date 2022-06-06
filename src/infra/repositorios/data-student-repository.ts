import DataStudent from '../database/models/data-student-model'

export default class DataStudentRepository {
  create (data: any) {
    return DataStudent.create(data)
  }

  load (id: string) {
    return DataStudent.findOne({
      where: { id },
      raw: true
    })
  }

  list (id: number) {
    return DataStudent.findOne({
      where: { GymStudentId: id },
      raw: true
    })
  }

  delete (id: number) {
    return DataStudent.destroy({
      where: { id }
    })
  }

  update (id: number, data: any) {
    return DataStudent.update(data, {
      where: { id }
    })
  }
}
