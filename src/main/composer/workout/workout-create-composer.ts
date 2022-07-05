import WorkoutCreateRoute from '../../../presentation/routes/workout/create-route'
import WorkoutUseCase from '../../../domain/workout/workout-usecase'
import WorkoutRepository from '../../../infra/repositorios/workout-repository'

export default class WorkoutCreateRouteComposer {
  static composer () {
    const workoutRepository = new WorkoutRepository()
    const workoutUseCase = new WorkoutUseCase(workoutRepository)
    return new WorkoutCreateRoute(workoutUseCase)
  }
}
