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

<<<<<<< HEAD
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
=======
  delete (email: string) {
    return GymStudent.destroy({
      where: { email }
    })
  }

  update (email: string, data: any) {
    return GymStudent.update(data, {
      where: { email }
>>>>>>> 40bf0ddaf424faebf47b12a7462ebcbe58abf71f
    })
  }
}
