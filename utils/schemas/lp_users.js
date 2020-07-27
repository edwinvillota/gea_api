const Joi = require('@hapi/joi')

const lpUserCodeSchema = Joi.number()
const lpUserNameSchema = Joi.string()
const lpUserAddressSchema = Joi.string()
const lpUserRateTypeSchema = Joi.number()

const createLpUserSchema = Joi.object({
  code: lpUserCodeSchema,
  name: lpUserNameSchema,
  address: lpUserAddressSchema,
  rateType: lpUserRateTypeSchema
})

const queryLpUserCodeSchema = Joi.object({
  code: Joi.number().required()
})

module.exports = {
  createLpUserSchema,
  queryLpUserCodeSchema
}