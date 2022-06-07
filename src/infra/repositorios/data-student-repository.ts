import DataStudent from '../database/models/data-student-model'

export default class DataStudentRepository {
  list (id: number) {
    return DataStudent.findOne({
      where: { gymStudentId: id },
      raw: true
    })
  }

  async update (id: number, data: any) {
    const result = await DataStudent.findOne({
      where: { gymStudentId: id },
      raw: true
    })
    if (result) {
      await DataStudent.update(data, { where: { gymStudentId: id } })
      return true
    } else {
      return false
    }
  }
}
