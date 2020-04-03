const Joi = require('@hapi/joi')

const scopeId = Joi.string().regex(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/).required()

const scopeIdSchema = Joi.object({
    scopeId: Joi.string().regex(/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/).required()
})

const createScopeSchema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    type: Joi.string().min(3).max(10).required(),
    resource: Joi.string().min(3).max(30).required()
})

module.exports = {
    scopeId,
    scopeIdSchema,
    createScopeSchema
}