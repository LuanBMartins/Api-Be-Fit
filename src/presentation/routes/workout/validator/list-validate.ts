import Joi from 'joi'

const schema = Joi.object({
  category: Joi.required(),
  id: Joi.required()
})

export default schema
