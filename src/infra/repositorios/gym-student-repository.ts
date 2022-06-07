import DataStudent from '../database/models/data-student-model'
import GymStudent from '../database/models/gym-student-model'

export default class GymStudentRepository {
  async create (data: any) {
    const gymStudent = await GymStudent.create(data)

    if (gymStudent) {
      await DataStudent.create({ gymStudentId: gymStudent.id })
      return true
    } else {
      return false
    }
  }

  load (email: string) {
    return GymStudent.findOne({
      where: { email },
      raw: true
    })
  }

  list (id: number) {
    return GymStudent.findOne({
      where: { id },
      raw: true
    })
  }

  delete (id: number) {
    return GymStudent.destroy({
      where: { id }
    })
  }

  update (id: number, data: any) {
    return GymStudent.update(data, {
      where: { id }
    })
  }
}
