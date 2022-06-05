import GymStudentModel from './gym-student-model'

export default interface GymStudentCreateHttpRequest {
    body: GymStudentModel,
    headers: {authorization: string},
    params: {id: number}
}
