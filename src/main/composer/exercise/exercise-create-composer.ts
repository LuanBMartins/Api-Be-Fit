import ExerciseCreate from '../../../presentation/routes/exercise/create-route'
import ExerciseUseCase from '../../../domain/exercise/exercise-usecase'
import ExerciseRepository from '../../../infra/repositorios/exercise-repository'

export default class ExerciseCreateComposer {
  static composer () {
    const exerciseRepository = new ExerciseRepository()
    const exerciseUseCase = new ExerciseUseCase(exerciseRepository)
    return new ExerciseCreate(exerciseUseCase)
  }
}
