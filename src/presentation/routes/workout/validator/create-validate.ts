import Joi from 'joi'

const schema = Joi.object({
  category: Joi.required(),
  day: Joi.string(),
  PersonalId: Joi.optional(),
  gymStudentId: Joi.number().required()
})

export default schema
