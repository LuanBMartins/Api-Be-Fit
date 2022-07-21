import WorkoutModel from './workout-model'

export default interface WorkoutCreateHttpRequest {
    body: WorkoutModel,
    headers: {authorization: string},
    params: {id: number}
}
