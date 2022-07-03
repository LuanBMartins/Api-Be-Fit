import Joi from 'joi'

const schema = Joi.object({
  name: Joi.required(),
  category: Joi.required(),
  url: Joi.string(),
  score: Joi.number().optional(),
  PersonalId: Joi.number().required()
})

export default schema
