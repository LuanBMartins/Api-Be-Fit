import CreateHttpRequest from '../../../interface/data-student/data-student-create-httpRequest'
import dataStudentInterface from '../../../interface/data-student/data-student-usecase'
import response from '../../utils/responseBody'

import Authenticate from '../../utils/Authenticate'

export default class DataStudentCreateRoute extends Authenticate {
  private dataStudentUseCase
  constructor (dataStudentUseCase: dataStudentInterface) {
    super()
    this.dataStudentUseCase = dataStudentUseCase
  }

  async route (httpRequest: CreateHttpRequest) {
    try {
      return response(500, 'Server Error!')
    } catch (error) {
      return response(error.status, error.message)
    }
  }
}
