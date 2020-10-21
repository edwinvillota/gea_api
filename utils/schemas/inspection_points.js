const Joi = require('@hapi/joi')

const pointIdSchema = Joi.number()
const pointTypeSchema = Joi.string().max(15)
const pointStructureSchema = Joi.string()
const pointLatitudeSchema = Joi.string()
const pointLongitudeSchema = Joi.string()
const pointCommentSchema = Joi.string()

const createPointSchema = Joi.object({
  type: pointTypeSchema.required(),
  structure: pointStructureSchema.required(),
  latitude: pointLatitudeSchema.required(),
  longitude: pointLongitudeSchema.required(),
  comment: pointCommentSchema.required()
})

module.exports = {
  pointIdSchema,
  createPointSchema
}