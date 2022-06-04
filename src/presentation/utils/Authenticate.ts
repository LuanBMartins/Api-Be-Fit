import jwt from 'jsonwebtoken'
import config from 'config'

/*
 * Authentication middleware
*/

export default abstract class Authenticate {
  public async authenticate (authorization: string): Promise<any> {
    try {
      if (!authorization) throw new Error('Token missing')

      const token = authorization.split(' ')[1]
      const decoded = jwt.verify(token, config.get('key.jwt'))
      return decoded
    } catch (e) {
      console.log(e)
    }
  }
}
