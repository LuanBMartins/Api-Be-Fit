import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import ErrorRes from './error'
dotenv.config()

/*
 * Authentication middleware
*/

export default abstract class Authenticate {
  public async authenticate (authorization: string, user = ''): Promise<any> {
    try {
      if (!authorization) throw new Error('Token missing')
      const decoded = jwt.verify(authorization, process.env.TOKEN || '')

      if (typeof decoded !== 'string') {
        if (decoded.useType !== (user || decoded.useType)) {
          throw new ErrorRes(401, 'Unauthorized!')
        }
      } else {
        throw new ErrorRes(401, 'Unauthorized!')
      }
      return decoded
    } catch (error) {
      throw new ErrorRes(401, 'Unauthorized!')
    }
  }
}
