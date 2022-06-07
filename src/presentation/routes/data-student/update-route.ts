import UpdateHttpRequest from '../../../interface/data-student/data-student-create-httpRequest'
import dataStudentInterface from '../../../interface/data-student/data-student-usecase'
import response from '../../utils/responseBody'

import Authenticate from '../../utils/Authenticate'

export default class DataStudentCreateRoute extends Authenticate {
  private dataStudentUseCase
  constructor (dataStudentUseCase: dataStudentInterface) {
    super()
    this.dataStudentUseCase = dataStudentUseCase
  }

  async route (httpRequest: UpdateHttpRequest) {
    try {
      const auth = await this.authenticate(httpRequest.headers.authorization)
      if (!auth) return response(401, 'Unauthorized!')

      if (!httpRequest.params.id) {
        return response(400, 'Invalid id!')
      }

      const dataList = await this.dataStudentUseCase.update(httpRequest.params.id, httpRequest.body)
      if (dataList) {
        return response(200, dataList)
      }

      return response(500, 'Server Error!')
    } catch (error) {
      return response(error.status, error.message)
    }
  }
}
