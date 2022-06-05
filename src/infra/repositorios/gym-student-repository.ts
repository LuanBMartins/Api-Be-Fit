import GymStudent from '../database/models/gym-student-model'

export default class GymStudentRepository {
  create (data: any) {
    return GymStudent.create(data)
  }

  load (id: number) {
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
