import GymStudentModel from './gym-student-model'

export default interface GymStudentCreateHttpRequest {
    body: GymStudentModel,
    header: {Authorization: string}
}
