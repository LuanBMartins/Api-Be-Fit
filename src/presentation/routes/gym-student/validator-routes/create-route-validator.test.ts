import schema from './create-route-validator'

describe('Validate gym student tests', () => {
  it('Should validate a gym student', () => {
    const httpRequest = {
      body: {
        name: 'Carlos Henrique',
        email: 'carlos@email.com',
        password: 'password@',
        goals: 'Ganhar massa muscular',
        PersonalId: 1
      }
    }

    const { error, value } = schema.validate(httpRequest.body)

    expect(error).toBe(null || undefined)
    expect(value).toEqual(httpRequest.body)
  })

  it('Should not validate gym student if name is invalid', () => {
    const httpRequest = {
      body: {
        name: '',
        email: 'carlos@email.com',
        password: 'password@',
        goals: 'Ganhar massa muscular',
        personalId: 1
      }
    }

    const { error } = schema.validate(httpRequest.body)

    expect(error.details[0].message).toBe('"name" is not allowed to be empty')
  })

  it('Should not validate gym student if email is invalid', () => {
    const httpRequest = {
      body: {
        name: 'Carlos Henrique',
        email: '',
        password: 'password@',
        goals: 'Ganhar massa muscular',
        personalId: 1
      }
    }

    const { error } = schema.validate(httpRequest.body)

    expect(error.details[0].message).toBe('"email" is not allowed to be empty')
  })

  it('Should not validate gym student if password is invalid', () => {
    const httpRequest = {
      body: {
        name: 'Carlos Henrique',
        email: 'carlos@email.com',
        password: '',
        goals: 'Ganhar massa muscular',
        personalId: 1
      }
    }

    const { error } = schema.validate(httpRequest.body)

    expect(error.details[0].message).toBe('"password" is not allowed to be empty')
  })

  it('Should not validate gym student if password is invalid', () => {
    const httpRequest = {
      body: {
        name: 'Carlos',
        email: 'carlos@email.com',
        password: 'pass',
        goals: 'Ganhar massa muscular',
        personalId: 1
      }
    }

    const { error } = schema.validate(httpRequest.body)

    expect(error.details[0].message).toBe('"name" length must be at least 10 characters long')
  })

  it('Should not validate gym student if goals is invalid', () => {
    const httpRequest = {
      body: {
        name: 'Carlos Henrique',
        email: 'carlos@email.com',
        password: 'password@',
        goals: '',
        personalId: 1
      }
    }

    const { error } = schema.validate(httpRequest.body)

    expect(error.details[0].message).toBe('"goals" is not allowed to be empty')
  })
  it('Should not validate gym student if personalId is invalid', () => {
    const httpRequest = {
      body: {
        name: 'Carlos Henrique',
        email: 'carlos@email.com',
        password: 'password@',
        goals: 'Ganhar massa muscular'
      }
    }

    const { error } = schema.validate(httpRequest.body)
    expect(error.details[0].message).toBe('"PersonalId" is required')
  })

  it('Should validate password with 8 characters', () => {
    const httpRequest = {
      body: {
        name: 'Carlos Henrique',
        email: 'carlos@email.com',
        password: 'ABY3996#',
        goals: 'Ganhar massa muscular',
        personalId: 1
      }
    }

    const { value } = schema.validate(httpRequest.body)

    expect(value.password).toBe(httpRequest.body.password)
  })

  it('Should validate password with 15 characters', () => {
    const httpRequest = {
      body: {
        name: 'Carlos Henrique',
        email: 'carlos@email.com',
        password: 'ABY3996#LLY3296!',
        goals: 'Ganhar massa muscular',
        personalId: 1
      }
    }

    const { value } = schema.validate(httpRequest.body)

    expect(value.password).toBe(httpRequest.body.password)
  })

  it('Should not validate password with 7 characters', () => {
    const httpRequest = {
      body: {
        name: 'Carlos Henrique',
        email: 'carlos@email.com',
        password: '1234567',
        goals: 'Ganhar massa muscular',
        personalId: 1
      }
    }

    const { error } = schema.validate(httpRequest.body)

    expect(error.details[0].message).toBe('"password" failed custom validation because Password must be at least 8 characters or 15 characters maximum')
  })

  it('Should validate password with 10 characters', () => {
    const httpRequest = {
      body: {
        name: 'Carlos Henrique',
        email: 'carlos@email.com',
        password: 'ABY3996#!A',
        goals: 'Ganhar massa muscular',
        personalId: 1
      }
    }

    const { value } = schema.validate(httpRequest.body)

    expect(value.password).toBe(httpRequest.body.password)
  })

  it('Should not validate password without special characters', () => {
    const httpRequest = {
      body: {
        name: 'Carlos Henrique',
        email: 'carlos@email.com',
        password: '123456789',
        goals: 'Ganhar massa muscular',
        personalId: 1
      }
    }

    const { error } = schema.validate(httpRequest.body)

    expect(error.details[0].message).toBe('"password" failed custom validation because Password needs to contain a special character')
  })
})
