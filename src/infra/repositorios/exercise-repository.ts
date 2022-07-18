import Exercise from '../database/models/exercise-model'

export default class ExerciseRepository {
  async create (data: any) {
    return await Exercise.create(data)
  }

  async list (id: number) {
    return await Exercise.findAll({
      where: { id },
      raw: true
    })
  }

  async listAll (workoutId: number) {
    return await Exercise.findAll({
      where: { workoutId },
      raw: true
    })
  }

  async delete (id: number) {
    return await Exercise.destroy({
      where: { id }
    })
  }

  async update (id: number, data: any) {
    return await Exercise.update(data, {
      where: { id }
    })
  }
}
