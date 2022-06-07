import PersonalModel from './personal-model'

export default interface GymStudentCreateHttpRequest {
    body: PersonalModel,
    headers: {authorization: string},
    params: {id: number, email: string}
}
