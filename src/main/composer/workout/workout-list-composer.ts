import WorkoutListRoute from '../../../presentation/routes/workout/listAll-route'
import WorkoutUseCase from '../../../domain/workout/workout-usecase'
import WorkoutRepository from '../../../infra/repositorios/workout-repository'

export default class WorkoutListRouteComposer {
  static composer () {
    const workoutRepository = new WorkoutRepository()
    const workoutUseCase = new WorkoutUseCase(workoutRepository)
    return new WorkoutListRoute(workoutUseCase)
  }
}
