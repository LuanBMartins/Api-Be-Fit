import DataStudentModel from './data-student-model'

export default interface dataStudentCreateHttpRequest {
    body: DataStudentModel,
    headers: {authorization: string},
    params: {}
}
