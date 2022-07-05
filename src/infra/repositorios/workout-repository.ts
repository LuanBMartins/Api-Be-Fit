import Workout from '../database/models/workout-model'

export default class WorkoutRepository {
  async create (data: any) {
    return await Workout.create(data)
  }

  async list (category: string, id: number) {
    return await Workout.findAll({
      where: { category, gymStudentId: id },
      raw: true
    })
  }

  async listAll (id: number) {
    return await Workout.findAll({
      where: { gymStudentId: id },
      raw: true
    })
  }

  async delete (id: number) {
    return await Workout.destroy({
      where: { id }
    })
  }

  async update (id: number, data: any) {
    return await Workout.update(data, {
      where: { id }
    })
  }
}
