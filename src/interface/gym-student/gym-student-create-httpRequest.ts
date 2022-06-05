import GymStudentModel from './gym-student-model'

export default interface GymStudentCreateHttpRequest {
    body: GymStudentModel,
<<<<<<< HEAD
    headers: {authorization: string},
    params: {id: number}
=======
    header: {Authorization: string}
>>>>>>> 40bf0ddaf424faebf47b12a7462ebcbe58abf71f
}
