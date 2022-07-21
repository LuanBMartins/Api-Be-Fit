import Joi from 'joi'

const schema = Joi.object({
  name: Joi.optional(),
  category: Joi.optional(),
  score: Joi.number().optional()
})

export default schema
