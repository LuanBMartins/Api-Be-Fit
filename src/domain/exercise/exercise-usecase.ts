import ExerciseRepositoryInterface from '../../interface/exercise/exercise-repository'
import ExerciseModel from '../../interface/exercise/exercise-model'
import ErrorRes from '../../presentation/utils/error'

export default class ExerciseUseCase {
  private exerciseRepository

  constructor (exerciseRepositoryInterface: ExerciseRepositoryInterface) {
    this.exerciseRepository = exerciseRepositoryInterface
  }

  async create (data: any) {
    return this.exerciseRepository.create(data)
  }

  async list (id: number) {
    if (!id) {
      throw new ErrorRes(400, 'invalid field Id!')
    }
    return this.exerciseRepository.list(id)
  }

  async listAll (id: number) {
    if (!id) {
      throw new ErrorRes(400, 'invalid field category or Id!')
    }
    return this.exerciseRepository.listAll(id)
  }

  async delete (id: number) {
    if (!id) {
      throw new ErrorRes(400, 'invalid field id!')
    }
    return this.exerciseRepository.delete(id)
  }

  async update (id: number, dataExercise: ExerciseModel) {
    const result = await this.exerciseRepository.update(id, dataExercise)
    return result
  }
}
