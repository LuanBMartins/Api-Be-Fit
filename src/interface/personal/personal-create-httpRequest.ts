import PersonalModel from './personal-model'

export default interface PersonalCreateHttpRequest {
    body?: PersonalModel,
    headers?: {authorization: string},
    params?: {id: number, email: string}
}
