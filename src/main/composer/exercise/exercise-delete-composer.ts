import ExerciseDeleteRoute from '../../../presentation/routes/exercise/delete-route'
import ExerciseUseCase from '../../../domain/exercise/exercise-usecase'
import ExerciseRepository from '../../../infra/repositorios/exercise-repository'

export default class ExerciseDeleteRouteComposer {
  static composer () {
    const exerciseRepository = new ExerciseRepository()
    const exerciseUseCase = new ExerciseUseCase(exerciseRepository)
    return new ExerciseDeleteRoute(exerciseUseCase)
  }
}
