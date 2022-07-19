import Joi from 'joi'

const schema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().min(10).max(100).required().regex(/^[a-zA-Z .!?"-]+$/).message('Special character not permitted in the name'),
  email: Joi.string().email().required(),
  password: Joi.string().custom((value) => {
    if (value.length < 8 || value.length > 15) {
      throw new Error('Password must be at least 8 characters or 15 characters maximum')
    } else if (!/\W/g.test(value)) {
      throw new Error('Password needs to contain a special character')
    } else {
      return value
    }
  }).optional(),
  goals: Joi.string().min(10).max(50).required().regex(/^[a-zA-Z .!?"-]+$/).message('Special character not permitted in the goals'),
  PersonalId: Joi.number().required()
})

export default schema
