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
    const query = `
      SELECT workout.*, 
             video.url,
             video.name
      FROM workout
      LEFT JOIN video ON video.category = workout.category
      WHERE workout."gymStudentId" = ${id}
    `
    const [queryResult] = await Workout.sequelize.query(query)
    return queryResult
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
