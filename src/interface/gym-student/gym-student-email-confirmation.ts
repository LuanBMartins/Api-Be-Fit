import GymStudentModel from './gym-student-model'

export default interface GymStudentEmailConfirmation {
  body: GymStudentModel,
  headers: {authorization: string},
  params: {token: string}
}
