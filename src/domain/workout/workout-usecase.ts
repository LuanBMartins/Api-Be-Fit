import WorkoutRepositoryInterface from '../../interface/workout/workout-repository'
import WorkoutModel from '../../interface/workout/workout-model'
import ErrorRes from '../../presentation/utils/error'

export default class VideoUseCase {
  private workoutRepository

  constructor (workoutRepositoryInterface: WorkoutRepositoryInterface) {
    this.workoutRepository = workoutRepositoryInterface
  }

  async create (data: any) {
    return this.workoutRepository.create(data)
  }

  async list (category: string, id: number) {
    if (!category || !id) {
      throw new ErrorRes(400, 'invalid field category or Id!')
    }
    return this.workoutRepository.list(category, id)
  }

  async listAll (id: number) {
    if (!id) {
      throw new ErrorRes(400, 'invalid field category or Id!')
    }
    return this.workoutRepository.listAll(id)
  }

  async delete (id: number) {
    if (!id) {
      throw new ErrorRes(400, 'invalid field id!')
    }
    return this.workoutRepository.delete(id)
  }

  async update (id: number, dataWorkout: WorkoutModel) {
    const result = await this.workoutRepository.update(id, dataWorkout)
    return result
  }
}
