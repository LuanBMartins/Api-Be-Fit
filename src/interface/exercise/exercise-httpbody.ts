import ExerciseModel from './exercise-model'

export default interface WorkoutCreateHttpRequest {
    body: ExerciseModel,
    headers: {authorization: string},
    params: {id: number}
}
