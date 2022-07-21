import WorkoutDeleteRoute from '../../../presentation/routes/workout/delete-route'
import WorkoutUseCase from '../../../domain/workout/workout-usecase'
import WorkoutRepository from '../../../infra/repositorios/workout-repository'

export default class WorkoutDeleteRouteComposer {
  static composer () {
    const workoutRepository = new WorkoutRepository()
    const workoutUseCase = new WorkoutUseCase(workoutRepository)
    return new WorkoutDeleteRoute(workoutUseCase)
  }
}
