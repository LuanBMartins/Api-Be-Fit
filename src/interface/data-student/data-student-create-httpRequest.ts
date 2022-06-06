import DataStudentModel from './data-student-model'

export default interface GymStudentCreateHttpRequest {
    body: DataStudentModel,
    headers: {authorization: string},
    params: {id: number}
}
