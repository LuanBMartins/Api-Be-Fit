import EmailConfirmationHttpRequest from '../../../interface/gym-student/gym-student-email-confirmation'
import gymStudentUseCaseInterface from '../../../interface/gym-student/gym-student-usecase'
import response from '../../utils/responseBody'
import Authenticate from '../../utils/Authenticate'

export default class GymStudentEmailConfirmationRoute extends Authenticate {
  private gymStudentUseCase
  constructor (gymStudentUseCase: gymStudentUseCaseInterface) {
    super()
    this.gymStudentUseCase = gymStudentUseCase
  }

  async route (httpRequest: EmailConfirmationHttpRequest) {
    try {
      const auth = await this.authenticate(httpRequest.params.token)
      if (!auth) return response(401, 'Unauthorized!')
      const userConfirmation = await this.gymStudentUseCase.emailConfirmation(auth.email)

      if (userConfirmation) {
        return response(200, 'Email successfully confirmed')
      }
      return response(400, 'Email not confirmed')
    } catch (error) {
      return response(error.status, error.message)
    }
  }
}
