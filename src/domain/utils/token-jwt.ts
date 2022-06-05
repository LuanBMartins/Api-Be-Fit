import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export default class TokenJWT {
  generate (data: any, useType: string) {
    data.useType = useType
    return jwt.sign(data, process.env.TOKEN || '1234', {
      expiresIn: '999d'
    })
  }
}
