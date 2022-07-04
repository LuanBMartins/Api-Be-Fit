import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default class TokenJWT {
  generate (data: any, useType: string) {
    data.useType = useType
    return jwt.sign(data, process.env.TOKEN || '', {
      expiresIn: '999d'
    })
  }

  generateConfirmationEmail (email: string) {
    return jwt.sign({ email }, process.env.TOKEN || '', {
      expiresIn: '999d'
    })
  }
}
