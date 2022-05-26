const jwt = require('jsonwebtoken')

export default class TokenJWT {
  generate (data: any) {
    return jwt.sign(data, '123456789', {
      expiresIn: '999d'
    })
  }
}
