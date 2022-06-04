import GymStudent from '../database/models/gym-student-model'

export default class GymStudentRepository {
  create (data: any) {
    return GymStudent.create(data)
  }

  load (email: string) {
    return GymStudent.findOne({
      where: { email },
      raw: true
    })
  }

  delete (email: string) {
    return GymStudent.destroy({
      where: { email }
    })
  }

  update (email: string, data: any) {
    return GymStudent.update(data, {
      where: { email }
    })
  }
}
